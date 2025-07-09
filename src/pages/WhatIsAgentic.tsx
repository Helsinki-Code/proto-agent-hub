import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Workflow, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  X,
  Layers,
  Cpu,
  Network,
  Wrench
} from "lucide-react";

const WhatIsAgentic = () => {
  const components = [
    {
      icon: Brain,
      title: "Intelligent Agents",
      description: "Autonomous AI entities that can reason, plan, and make decisions independently.",
      details: [
        "Goal-oriented behavior",
        "Decision-making capabilities",
        "Environmental awareness",
        "Adaptive learning"
      ]
    },
    {
      icon: Cpu,
      title: "Large Language Models",
      description: "Advanced AI models that provide natural language understanding and generation.",
      details: [
        "GPT-4, Claude, Gemini integration",
        "Context-aware processing",
        "Multi-modal capabilities",
        "Fine-tuning support"
      ]
    },
    {
      icon: Network,
      title: "Orchestration Layer",
      description: "Coordination system that manages multiple agents and their interactions.",
      details: [
        "Agent communication",
        "Task distribution",
        "Conflict resolution",
        "Performance monitoring"
      ]
    },
    {
      icon: Wrench,
      title: "Tool Integration",
      description: "Seamless connection to external APIs, databases, and business systems.",
      details: [
        "API connectivity",
        "Database integration",
        "Custom tool creation",
        "Security protocols"
      ]
    }
  ];

  const comparison = [
    {
      aspect: "Decision Making",
      traditional: "Follows predefined rules",
      agentic: "Reasons through complex scenarios",
      icon: Brain
    },
    {
      aspect: "Adaptability",
      traditional: "Requires manual updates",
      agentic: "Learns and adapts automatically",
      icon: Zap
    },
    {
      aspect: "Problem Solving",
      traditional: "Limited to programmed solutions",
      agentic: "Creates novel approaches",
      icon: Target
    },
    {
      aspect: "Scalability",
      traditional: "Linear scaling challenges",
      agentic: "Elastic, multi-agent scaling",
      icon: Layers
    }
  ];

  const capabilities = [
    "Natural language understanding and generation",
    "Multi-step reasoning and planning",
    "Tool usage and API integration",
    "Memory and context retention",
    "Goal-oriented task execution",
    "Collaborative multi-agent workflows",
    "Real-time adaptation to changes",
    "Continuous learning from outcomes"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-primary/10 border-primary/20">
              🧠 Deep Dive into Agentic AI
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              What Is <span className="text-gradient">Agentic AI</span>?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Understand the fundamental concepts, architecture, and capabilities that make 
              agentic AI the next evolution in artificial intelligence systems.
            </p>
          </div>
        </div>
      </section>

      {/* Definition Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Definition of "Agentic"</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Agentic AI refers to artificial intelligence systems that can act autonomously 
                to achieve specific goals. Unlike traditional AI that simply responds to inputs, 
                agentic AI can:
              </p>
              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Brain className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Key Principle</h3>
                <p className="text-muted-foreground italic">
                  "Agentic AI systems don't just process information—they understand goals, 
                  make plans, take actions, and learn from outcomes to continuously improve."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Rule-Based vs. <span className="text-gradient">Agentic Intelligence</span></h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              See the fundamental differences between traditional automation and agentic AI systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparison.map((item, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-center">{item.aspect}</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">Traditional</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.traditional}</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Agentic</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.agentic}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core <span className="text-gradient">Components</span></h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Understanding the key building blocks that make agentic AI systems possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {components.map((component, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <component.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{component.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{component.description}</p>
                  <div className="space-y-2">
                    {component.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Agentic AI <span className="text-gradient">Workflow</span></h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The continuous cycle of planning, acting, and learning that defines agentic behavior.
            </p>
          </div>
          <div className="card-gradient rounded-lg p-8 glow-primary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Target className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Plan</h3>
                <p className="text-muted-foreground">
                  Analyze objectives, understand context, and create execution strategies
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Zap className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Act</h3>
                <p className="text-muted-foreground">
                  Execute tasks autonomously, make real-time decisions, and use available tools
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Brain className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Learn</h3>
                <p className="text-muted-foreground">
                  Analyze outcomes, update strategies, and continuously improve performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Agentic AI?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how agentic AI can transform your business operations with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                View Developer Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatIsAgentic;