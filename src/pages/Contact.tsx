import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar, 
  MessageSquare,
  Clock,
  CheckCircle,
  Loader2
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "support@agentic-ai.ltd",
      description: "Get in touch for general inquiries"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+44 7771970567",
      description: "Speak with our team directly"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "25 Cavendish Square, London W1G 0PN, United Kingdom",
      description: "Visit our London headquarters"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 9AM-6PM GMT",
      description: "Our team is available during business hours"
    }
  ];

  const responseTypes = [
    {
      type: "General Inquiry",
      time: "24 hours",
      description: "Questions about our services or company"
    },
    {
      type: "Technical Support",
      time: "4 hours",
      description: "Support for existing clients"
    },
    {
      type: "Sales & Consultation",
      time: "2 hours",
      description: "New project discussions"
    },
    {
      type: "Partnership",
      time: "48 hours",
      description: "Strategic partnership opportunities"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Success
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20">
              💬 Get In Touch
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Let's Build Your <span className="text-gradient">Agentic Future</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to transform your business with intelligent AI agents? 
              Our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="card-gradient border-border glow-primary">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        className="bg-background/50 border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        className="bg-background/50 border-border"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@company.com"
                      className="bg-background/50 border-border"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your Company"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input 
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="How can we help?"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your project and how we can help..."
                      rows={5}
                      className="bg-background/50 border-border resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <info.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                            <p className="text-primary font-medium mb-1">{info.details}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="btn-ghost w-full justify-start">
                      <Calendar className="mr-2 w-4 h-4" />
                      Schedule a Demo
                    </Button>
                    <Button className="btn-ghost w-full justify-start">
                      <MessageSquare className="mr-2 w-4 h-4" />
                      Live Chat Support
                    </Button>
                    <Button className="btn-ghost w-full justify-start">
                      <Phone className="mr-2 w-4 h-4" />
                      Request Callback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Response <span className="text-gradient">Times</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand that time is critical. Here's what to expect when you reach out.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseTypes.map((response, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{response.type}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{response.time}</p>
                  <p className="text-sm text-muted-foreground">{response.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of London's business district, our office is always open to visitors.
            </p>
          </div>
          <div className="w-full h-96 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">25 Cavendish Square</h3>
              <p className="text-muted-foreground">London W1G 0PN, United Kingdom</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;