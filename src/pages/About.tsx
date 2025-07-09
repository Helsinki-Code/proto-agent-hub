import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Clock, TrendingUp, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Autonomy",
      description: "We build AI agents that work independently to achieve your business goals."
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Our solutions are built for enterprise-grade performance and consistency."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We stay at the forefront of AI research to deliver cutting-edge solutions."
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "AgenticAI was born from a vision to democratize autonomous AI systems."
    },
    {
      year: "2024",
      title: "First Enterprise Partnership",
      description: "Signed our first major enterprise client, automating complex workflows."
    },
    {
      year: "2024",
      title: "Product Launch",
      description: "Released our flagship agentic workflow automation platform."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former AI researcher at Stanford with 10+ years in machine learning systems.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer specializing in distributed systems and LLM orchestration.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science, published researcher in autonomous agent architectures.",
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Our Mission: <span className="text-gradient">Autonomous Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're building the future where AI agents work alongside humans to solve complex problems autonomously, 
              making businesses more efficient and innovative.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                AgenticAI was founded in 2023 by a team of AI researchers and engineers who recognized 
                the transformative potential of autonomous AI systems. We saw that while AI was advancing 
                rapidly, most implementations were still reactive rather than proactive.
              </p>
              <p className="text-muted-foreground mb-6">
                Our founders came together with a shared vision: to create AI agents that don't just 
                respond to commands, but actively work towards goals, make decisions, and adapt to 
                changing circumstances—just like human employees would.
              </p>
              <p className="text-muted-foreground">
                Today, we're helping businesses across industries implement agentic AI solutions 
                that truly transform how work gets done.
              </p>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">500+ AI Agents Deployed</h3>
                    <p className="text-muted-foreground">Across various industries</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">80% Process Automation</h3>
                    <p className="text-muted-foreground">Average improvement rate</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">50+ Enterprise Clients</h3>
                    <p className="text-muted-foreground">Fortune 500 companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development to client relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our mission to democratize agentic AI.
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Badge variant="outline" className="bg-primary text-primary-foreground">
                    {milestone.year}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              World-class experts in AI, machine learning, and autonomous systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;