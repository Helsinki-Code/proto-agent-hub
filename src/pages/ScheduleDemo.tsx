import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  ArrowRight,
  Video,
  MapPin,
  Phone,
  MessageSquare,
  Zap,
  Users,
  Target
} from "lucide-react";

const ScheduleDemo = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [demoType, setDemoType] = useState("video");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    useCase: "",
    teamSize: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [liveBookings, setLiveBookings] = useState(23);

  // Simulate live booking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 2));
      // Simulate slots getting booked
      if (Math.random() > 0.7) {
        const randomSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        setBookedSlots(prev => [...prev, randomSlot].slice(0, 3));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a time slot.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "🎉 Demo Scheduled!",
      description: "You'll receive a calendar invite and demo details via email shortly.",
    });
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      industry: "",
      useCase: "",
      teamSize: "",
      message: ""
    });
    setSelectedDate("");
    setSelectedTime("");
  };

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const demoTypes = [
    {
      id: "video",
      title: "Video Call Demo",
      description: "Personalized 30-minute demo with Q&A",
      duration: "30 min",
      icon: Video
    },
    {
      id: "onsite",
      title: "On-site Presentation",
      description: "In-person demo at your office",
      duration: "1 hour",
      icon: MapPin
    },
    {
      id: "phone",
      title: "Phone Consultation",
      description: "Quick overview and discovery call",
      duration: "15 min",
      icon: Phone
    }
  ];

  const industries = [
    "Finance & Banking", "Healthcare", "Retail & E-commerce", "Manufacturing",
    "Legal Services", "Real Estate", "Education", "Technology", "Government", "Other"
  ];

  const useCases = [
    "Workflow Automation", "Customer Support", "Data Analysis", "Document Processing",
    "Predictive Maintenance", "Sales Optimization", "Compliance Management", "Other"
  ];

  const teamSizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

  const availableDates = generateDates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Schedule Your <span className="text-gradient">Personal Demo</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Get a personalized demonstration of how our AI agents can transform your specific business processes.
            </p>
            
            {/* Live Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{liveBookings} demos booked this week</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>Average: 4.9★ rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>92% book a follow-up</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-width max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Column - Scheduling */}
            <div className="space-y-8">
              {/* Demo Type Selection */}
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span>Select Demo Type</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {demoTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        demoType === type.id
                          ? 'border-primary bg-primary/5 glow-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setDemoType(type.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <type.icon className={`w-5 h-5 ${
                          demoType === type.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium">{type.title}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                        <Badge variant="outline">{type.duration}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Date Selection */}
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Select Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableDates.map((date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          <div className="font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-xs">
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Time Selection */}
              {selectedDate && (
                <Card className="card-gradient border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Select Time</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {timeSlots.map((time) => {
                        const isBooked = bookedSlots.includes(time);
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => !isBooked && setSelectedTime(time)}
                            disabled={isBooked}
                            className={`p-3 rounded-lg border text-sm transition-all duration-300 ${
                              isBooked
                                ? 'border-muted bg-muted/50 text-muted-foreground cursor-not-allowed'
                                : isSelected
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:border-primary/50 hover:bg-primary/5'
                            }`}
                          >
                            {time}
                            {isBooked && <div className="text-xs">Booked</div>}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Form */}
            <div className="space-y-8">
              <Card className="card-gradient border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Your Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry</Label>
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
                    <div>
                      <Label htmlFor="teamSize">Team Size</Label>
                      <select
                        id="teamSize"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className="mt-2 w-full p-3 rounded-lg border border-border bg-background"
                      >
                        <option value="">Select Size</option>
                        {teamSizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="useCase">Primary Use Case</Label>
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
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your specific needs or questions for the demo..."
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <Card className="card-gradient border-border glow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Demo Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{selectedTime} (EST)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">
                          {demoTypes.find(t => t.id === demoType)?.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">
                          {demoTypes.find(t => t.id === demoType)?.duration}
                        </span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full btn-primary text-lg py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Scheduling Demo...
                        </>
                      ) : (
                        <>
                          <Calendar className="mr-2 w-5 h-5" />
                          Schedule My Demo
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      You'll receive a calendar invite and demo preparation details via email
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What to Expect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your personalized demo experience designed for maximum value
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-8">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Discovery Call</h3>
                <p className="text-muted-foreground text-sm">
                  We'll learn about your specific challenges and objectives
                </p>
              </CardContent>
            </Card>
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-8">
                <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Demo</h3>
                <p className="text-muted-foreground text-sm">
                  See AI agents in action solving problems similar to yours
                </p>
              </CardContent>
            </Card>
            <Card className="card-gradient border-border text-center">
              <CardContent className="p-8">
                <Target className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Custom Roadmap</h3>
                <p className="text-muted-foreground text-sm">
                  Receive a tailored implementation plan for your business
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleDemo;