import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  ArrowRight, 
  BookOpen, 
  GitBranch, 
  Terminal,
  Zap,
  Shield,
  Settings,
  Download,
  ExternalLink
} from "lucide-react";

const DeveloperGuides = () => {
  const guides = [
    {
      title: "Getting Started with LangChain",
      description: "Comprehensive guide to building your first agentic AI system using LangChain framework",
      level: "Beginner",
      duration: "2 hours",
      topics: [
        "LangChain architecture overview",
        "Setting up your development environment",
        "Building your first agent",
        "Connecting to external APIs",
        "Error handling and debugging"
      ],
      downloadUrl: "/guides/langchain-getting-started.pdf"
    },
    {
      title: "Multi-Agent Orchestration",
      description: "Advanced patterns for coordinating multiple AI agents in complex workflows",
      level: "Advanced",
      duration: "4 hours",
      topics: [
        "Agent communication patterns",
        "Workflow orchestration",
        "State management",
        "Error recovery strategies",
        "Performance optimization"
      ],
      downloadUrl: "/guides/multi-agent-orchestration.pdf"
    },
    {
      title: "RAG Implementation Best Practices",
      description: "Build robust Retrieval-Augmented Generation systems for enterprise applications",
      level: "Intermediate",
      duration: "3 hours",
      topics: [
        "Document ingestion pipelines",
        "Embedding strategies",
        "Vector database optimization",
        "Query optimization",
        "Evaluation metrics"
      ],
      downloadUrl: "/guides/rag-best-practices.pdf"
    },
    {
      title: "Production Deployment Guide",
      description: "Deploy agentic AI systems to production with monitoring and scaling",
      level: "Advanced",
      duration: "3 hours",
      topics: [
        "Container orchestration",
        "Monitoring and observability",
        "Auto-scaling strategies",
        "Security considerations",
        "CI/CD pipelines"
      ],
      downloadUrl: "/guides/production-deployment.pdf"
    },
    {
      title: "AutoGen Framework Tutorial",
      description: "Learn Microsoft's AutoGen framework for building conversational AI agents",
      level: "Intermediate",
      duration: "2.5 hours",
      topics: [
        "AutoGen architecture",
        "Agent configuration",
        "Conversation flows",
        "Custom agent creation",
        "Integration patterns"
      ],
      downloadUrl: "/guides/autogen-tutorial.pdf"
    },
    {
      title: "AI Safety and Ethics",
      description: "Implement responsible AI practices in your agentic systems",
      level: "All Levels",
      duration: "1.5 hours",
      topics: [
        "AI safety principles",
        "Bias detection and mitigation",
        "Ethical considerations",
        "Compliance frameworks",
        "Monitoring and auditing"
      ],
      downloadUrl: "/guides/ai-safety-ethics.pdf"
    }
  ];

  const codeExamples = [
    {
      title: "Simple Agent Setup",
      description: "Basic agent configuration with LangChain",
      language: "Python",
      github: "https://github.com/yourusername/simple-agent-example"
    },
    {
      title: "Multi-Agent Workflow",
      description: "Orchestrating multiple agents for complex tasks",
      language: "Python",
      github: "https://github.com/yourusername/multi-agent-workflow"
    },
    {
      title: "RAG with Vector DB",
      description: "Complete RAG implementation with Pinecone",
      language: "Python",
      github: "https://github.com/yourusername/rag-vector-db"
    },
    {
      title: "Production Ready Template",
      description: "Docker-based deployment template",
      language: "Docker",
      github: "https://github.com/yourusername/production-template"
    }
  ];

  const tutorials = [
    {
      title: "Build a Customer Support Agent",
      description: "Step-by-step tutorial for creating an intelligent customer support agent",
      type: "Video Tutorial",
      duration: "45 minutes"
    },
    {
      title: "Document Analysis Pipeline",
      description: "Create an automated document analysis system",
      type: "Interactive Guide",
      duration: "60 minutes"
    },
    {
      title: "API Integration Patterns",
      description: "Connect your agents to external APIs and services",
      type: "Code Walkthrough",
      duration: "30 minutes"
    }
  ];

  const resources = [
    {
      icon: Code,
      title: "Sample Code Repository",
      description: "Access our GitHub repository with production-ready examples",
      link: "https://github.com/yourusername/agentic-ai-examples"
    },
    {
      icon: Terminal,
      title: "CLI Tools",
      description: "Download our command-line tools for rapid development",
      link: "/downloads/cli-tools"
    },
    {
      icon: Shield,
      title: "Security Templates",
      description: "Security configuration templates for enterprise deployment",
      link: "/downloads/security-templates"
    },
    {
      icon: Settings,
      title: "Configuration Examples",
      description: "Pre-configured setups for common use cases",
      link: "/downloads/config-examples"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Code className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Developer <span className="text-gradient">Guides</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive technical documentation, tutorials, and code examples to help you build 
              and deploy agentic AI systems quickly and effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Browse Guides
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                <GitBranch className="mr-2 w-5 h-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technical Guides</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In-depth guides covering everything from basic setup to advanced implementation patterns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{guide.title}</h3>
                    <Badge variant={guide.level === 'Beginner' ? 'secondary' : guide.level === 'Advanced' ? 'default' : 'outline'}>
                      {guide.level}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>{guide.duration}</span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-sm">Topics Covered:</h4>
                    <ul className="space-y-1">
                      {guide.topics.slice(0, 3).map((topic, topicIndex) => (
                        <li key={topicIndex} className="text-xs text-muted-foreground">
                          • {topic}
                        </li>
                      ))}
                      {guide.topics.length > 3 && (
                        <li className="text-xs text-muted-foreground">
                          • +{guide.topics.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="btn-primary flex-1 text-sm">
                      <Download className="mr-2 w-4 h-4" />
                      Download
                    </Button>
                    <Button className="btn-ghost flex-1 text-sm">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Code Examples</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Production-ready code examples and templates to accelerate your development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {codeExamples.map((example, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{example.title}</h3>
                    <Badge variant="secondary">{example.language}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{example.description}</p>
                  <Button className="btn-ghost w-full">
                    <GitBranch className="mr-2 w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interactive Tutorials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials that guide you through building complete agentic AI solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{tutorial.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{tutorial.type}</Badge>
                    <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                  </div>
                  <Button className="btn-primary w-full">
                    Start Tutorial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Developer Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential tools and resources to streamline your agentic AI development workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button className="btn-ghost w-full text-sm">
                    Access Resource
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of developers building the future with agentic AI.
            </p>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Quick Start</h3>
                  <p className="text-sm text-muted-foreground">Get up and running in minutes with our starter templates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Comprehensive Docs</h3>
                  <p className="text-sm text-muted-foreground">Detailed documentation covering all aspects of development</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Settings className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">Get help from our team of agentic AI experts</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-primary text-lg px-8 py-3">
                  Download Starter Kit
                  <Download className="ml-2 w-5 h-5" />
                </Button>
                <Button className="btn-ghost text-lg px-8 py-3">
                  Join Developer Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperGuides;