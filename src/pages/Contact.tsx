import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar, 
  MessageSquare,
  Clock,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@agentic-ai.ltd",
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input 
                        placeholder="John"
                        className="bg-background/50 border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input 
                        placeholder="Doe"
                        className="bg-background/50 border-border"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email"
                      placeholder="john@company.com"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <Input 
                      placeholder="Your Company"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input 
                      placeholder="How can we help?"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your project and how we can help..."
                      rows={5}
                      className="bg-background/50 border-border resize-none"
                    />
                  </div>
                  
                  <Button className="btn-primary w-full">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
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
          <div className="card-gradient rounded-lg p-8 glow-primary">
            <div className="bg-muted/20 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-muted-foreground">
                  25 Cavendish Square<br />
                  London W1G 0PN, United Kingdom
                </p>
                <Button className="btn-primary mt-4">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;