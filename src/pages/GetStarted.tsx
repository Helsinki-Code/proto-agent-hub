import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap, 
  Rocket,
  MessageSquare,
  Target,
  BarChart3
} from "lucide-react";

const GetStarted = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    useCase: "",
    budget: "",
    timeline: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveStats, setLiveStats] = useState({
    activeProjects: 127,
    agentsDeployed: 1423,
    hoursAutomated: 15680
  });

  // Real-time stats simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3),
        agentsDeployed: prev.agentsDeployed + Math.floor(Math.random() * 5),
        hoursAutomated: prev.hoursAutomated + Math.floor(Math.random() * 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      toast({
        title: `Step ${step + 1} of 3`,
        description: "Getting closer to your AI transformation!",
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Send notification email to info@agentic-ai.ltd
      const notificationData = {
        to: "info@agentic-ai.ltd",
        subject: "New Journey Started - Lead Notification",
        formData: formData,
        timestamp: new Date().toISOString()
      };
      
      // Note: This requires backend integration to actually send emails
      console.log("New lead submission:", notificationData);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "🎉 Welcome to the AI Revolution!",
        description: "Your journey starts now. Our team will contact you within 24 hours!",
      });
      
      setIsSubmitting(false);
      setStep(4);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const industries = [
    "Finance & Banking", "Healthcare", "Retail & E-commerce", "Manufacturing",
    "Legal Services", "Real Estate", "Education", "Technology", "Other"
  ];

  const useCases = [
    "Workflow Automation", "Customer Support", "Data Analysis", "Document Processing",
    "Predictive Maintenance", "Sales Optimization", "Compliance Management", "Other"
  ];

  const budgetRanges = [
    "$5K - $25K", "$25K - $100K", "$100K - $500K", "$500K+", "Need consultation"
  ];

  const timelines = [
    "ASAP", "1-3 months", "3-6 months", "6-12 months", "12+ months"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Start Your <span className="text-gradient">AI Journey</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your business with intelligent automation. Get personalized recommendations in just 3 steps.
            </p>
            
            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-pulse">{liveStats.activeProjects}</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-pulse">{liveStats.agentsDeployed}</div>
                <div className="text-sm text-muted-foreground">AI Agents Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary animate-pulse">{liveStats.hoursAutomated.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Hours Automated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="container-width mb-8">
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > num ? <CheckCircle className="w-5 h-5" /> : num}
              </div>
              {num < 3 && (
                <div className={`w-12 h-1 transition-all duration-300 ${
                  step > num ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Badge variant="outline" className="animate-pulse">
            Step {step} of 3
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-width max-w-4xl mx-auto">
          {step === 1 && (
            <Card className="card-gradient border-border glow-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <Users className="w-6 h-6 text-primary" />
                  <span>Tell Us About You</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="John Smith"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Business Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Acme Corporation"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.name || !formData.email || !formData.company || !formData.industry}
                    className="btn-primary"
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="card-gradient border-border glow-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Your AI Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="useCase">Primary Use Case *</Label>
                    <select
                      id="useCase"
                      value={formData.useCase}
                      onChange={(e) => handleInputChange('useCase', e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select Use Case</option>
                      {useCases.map(useCase => (
                        <option key={useCase} value={useCase}>{useCase}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range *</Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="mt-2 w-full p-3 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select Budget</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline *</Label>
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="mt-2 w-full p-3 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select Timeline</option>
                    {timelines.map(timeline => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your current challenges and what you'd like to achieve with AI..."
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <div className="flex justify-between">
                  <Button onClick={() => setStep(1)} variant="outline">
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={!formData.useCase || !formData.budget || !formData.timeline}
                    className="btn-primary"
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="card-gradient border-border glow-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  <span>Launch Your Project</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/20 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Your AI Transformation Summary:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Company:</strong> {formData.company}</div>
                    <div><strong>Industry:</strong> {formData.industry}</div>
                    <div><strong>Use Case:</strong> {formData.useCase}</div>
                    <div><strong>Budget:</strong> {formData.budget}</div>
                    <div><strong>Timeline:</strong> {formData.timeline}</div>
                  </div>
                  {formData.description && (
                    <div className="mt-4">
                      <strong>Description:</strong>
                      <p className="mt-1 text-muted-foreground">{formData.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-4">What Happens Next?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">Within 24 Hours</div>
                      <div className="text-xs text-muted-foreground">Personal consultation call</div>
                    </div>
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">Week 1</div>
                      <div className="text-xs text-muted-foreground">Custom proposal & roadmap</div>
                    </div>
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">Week 2</div>
                      <div className="text-xs text-muted-foreground">Pilot implementation begins</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button onClick={() => setStep(2)} variant="outline">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Launching...
                      </>
                    ) : (
                      <>
                        Start My AI Journey
                        <Rocket className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="card-gradient border-border glow-primary text-center">
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4">🎉 Welcome to the Future!</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Thank you for choosing us for your AI transformation. Our team will contact you within 24 hours 
                  to discuss your personalized implementation plan.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <Button className="btn-primary">
                    <MessageSquare className="mr-2 w-4 h-4" />
                    Join Our Community
                  </Button>
                  <Button className="btn-ghost">
                    <BarChart3 className="mr-2 w-4 h-4" />
                    Explore Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default GetStarted;