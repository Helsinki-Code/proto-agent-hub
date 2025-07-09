import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowRight, 
  Download, 
  Search,
  Filter,
  FileText,
  Video,
  Code,
  ExternalLink,
  Calendar,
  Users,
  Star
} from "lucide-react";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Whitepapers", "Guides", "Research", "Videos", "Tools"];

  const resources = [
    {
      title: "The Complete Guide to Agentic AI",
      description: "Comprehensive 50-page guide covering everything from basic concepts to advanced implementation strategies.",
      type: "Whitepaper",
      format: "PDF",
      pages: 50,
      downloads: 12500,
      rating: 4.8,
      downloadUrl: "/resources/complete-guide-agentic-ai.pdf",
      category: "Whitepapers"
    },
    {
      title: "ROI Calculator for AI Automation",
      description: "Interactive tool to calculate potential return on investment for AI automation projects.",
      type: "Tool",
      format: "Web App",
      downloads: 8200,
      rating: 4.6,
      downloadUrl: "/tools/roi-calculator",
      category: "Tools"
    },
    {
      title: "Multi-Agent Systems Architecture",
      description: "Technical deep-dive into designing scalable multi-agent architectures for enterprise applications.",
      type: "Technical Guide",
      format: "PDF",
      pages: 35,
      downloads: 5400,
      rating: 4.9,
      downloadUrl: "/resources/multi-agent-architecture.pdf",
      category: "Guides"
    },
    {
      title: "AI Ethics Framework Implementation",
      description: "Practical framework for implementing ethical AI practices in your organization.",
      type: "Framework",
      format: "PDF",
      pages: 28,
      downloads: 3600,
      rating: 4.7,
      downloadUrl: "/resources/ai-ethics-framework.pdf",
      category: "Guides"
    },
    {
      title: "Industry AI Adoption Report 2024",
      description: "Latest research on AI adoption trends across different industries with market insights.",
      type: "Research Report",
      format: "PDF",
      pages: 45,
      downloads: 9800,
      rating: 4.5,
      downloadUrl: "/resources/ai-adoption-report-2024.pdf",
      category: "Research"
    },
    {
      title: "Building Your First AI Agent",
      description: "Step-by-step video tutorial for creating your first intelligent agent using modern frameworks.",
      type: "Video Tutorial",
      format: "Video",
      duration: "45 minutes",
      views: 15600,
      rating: 4.8,
      downloadUrl: "/videos/first-ai-agent",
      category: "Videos"
    },
    {
      title: "LangChain vs AutoGen Comparison",
      description: "Detailed comparison of popular agent frameworks with performance benchmarks and use case recommendations.",
      type: "Comparison Guide",
      format: "PDF",
      pages: 22,
      downloads: 7300,
      rating: 4.6,
      downloadUrl: "/resources/langchain-vs-autogen.pdf",
      category: "Guides"
    },
    {
      title: "AI Governance Checklist",
      description: "Comprehensive checklist for implementing AI governance in enterprise environments.",
      type: "Checklist",
      format: "PDF",
      pages: 15,
      downloads: 4200,
      rating: 4.4,
      downloadUrl: "/resources/ai-governance-checklist.pdf",
      category: "Tools"
    },
    {
      title: "Future of Work with AI Agents",
      description: "Research paper exploring how AI agents will reshape the modern workplace over the next decade.",
      type: "Research Paper",
      format: "PDF",
      pages: 38,
      downloads: 6700,
      rating: 4.7,
      downloadUrl: "/resources/future-of-work-ai.pdf",
      category: "Research"
    },
    {
      title: "Production Deployment Best Practices",
      description: "Video series covering best practices for deploying AI agents in production environments.",
      type: "Video Series",
      format: "Video",
      duration: "2 hours",
      views: 8900,
      rating: 4.9,
      downloadUrl: "/videos/production-deployment",
      category: "Videos"
    },
    {
      title: "AI Cost Optimization Strategies",
      description: "Practical strategies for reducing AI implementation and operational costs without compromising performance.",
      type: "Strategy Guide",
      format: "PDF",
      pages: 32,
      downloads: 5800,
      rating: 4.8,
      downloadUrl: "/resources/ai-cost-optimization.pdf",
      category: "Whitepapers"
    },
    {
      title: "Security Framework for AI Systems",
      description: "Comprehensive security framework specifically designed for AI and machine learning systems.",
      type: "Security Guide",
      format: "PDF",
      pages: 41,
      downloads: 4900,
      rating: 4.6,
      downloadUrl: "/resources/ai-security-framework.pdf",
      category: "Guides"
    }
  ];

  const filteredResources = activeFilter === "All" 
    ? resources 
    : resources.filter(resource => resource.category === activeFilter);

  const glossaryTerms = [
    {
      term: "Agentic AI",
      definition: "AI systems that can act autonomously to achieve goals through planning, reasoning, and decision-making."
    },
    {
      term: "Multi-Agent System",
      definition: "A distributed computing system where multiple autonomous agents interact to solve complex problems."
    },
    {
      term: "RAG (Retrieval-Augmented Generation)",
      definition: "A technique that combines retrieval of relevant information with text generation to improve AI responses."
    },
    {
      term: "Agent Orchestration",
      definition: "The coordination and management of multiple AI agents working together on complex tasks."
    },
    {
      term: "Foundation Model",
      definition: "Large-scale AI models trained on diverse data that can be adapted for various downstream tasks."
    },
    {
      term: "Prompt Engineering",
      definition: "The practice of crafting effective inputs to guide AI models toward desired outputs."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <BookOpen className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Knowledge <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive resources to accelerate your agentic AI journey. Access whitepapers, 
              guides, tools, and research from industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-3">
                Explore Resources
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-ghost text-lg px-8 py-3">
                <Search className="mr-2 w-5 h-5" />
                Search Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{filter}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{resource.type}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Format:</span>
                      <span>{resource.format}</span>
                    </div>
                    
                    {resource.pages && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pages:</span>
                        <span>{resource.pages}</span>
                      </div>
                    )}
                    
                    {resource.duration && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{resource.duration}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {resource.downloads ? "Downloads:" : "Views:"}
                      </span>
                      <span>{resource.downloads || resource.views}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="btn-primary flex-1 text-sm">
                      <Download className="mr-2 w-4 h-4" />
                      Access
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

      {/* AI Glossary Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Glossary</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Essential terms and definitions to help you navigate the world of agentic AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryTerms.map((item, index) => (
              <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.term}</h3>
                  <p className="text-muted-foreground text-sm">{item.definition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="btn-ghost">
              View Complete Glossary
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Research Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Latest Research</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Industry Reports</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay updated with the latest trends and insights in AI adoption across industries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Case Studies</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-world examples of successful agentic AI implementations and their outcomes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Future Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Forward-looking analysis on the future of AI agents and their impact on business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-gradient rounded-lg p-8 glow-primary">
              <h3 className="text-xl font-semibold mb-4">Subscribe to Updates</h3>
              <p className="text-muted-foreground mb-6">
                Get notified when new resources are published and stay ahead of the curve.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="btn-primary w-full">
                  Subscribe to Updates
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;