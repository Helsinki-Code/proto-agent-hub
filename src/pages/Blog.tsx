import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  User, 
  Search, 
  ArrowRight, 
  Clock, 
  Tag,
  BookOpen,
  TrendingUp,
  Brain,
  Lightbulb,
  Users,
  Settings
} from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: BookOpen },
    { name: "Use Cases", icon: TrendingUp },
    { name: "Tutorials", icon: Settings },
    { name: "Industry Trends", icon: Lightbulb },
    { name: "AI Research", icon: Brain }
  ];

  const posts = [
    {
      title: "The Future of Agentic AI in Financial Services",
      excerpt: "How autonomous AI agents are revolutionizing banking, insurance, and investment management with intelligent automation.",
      category: "Use Cases",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/api/placeholder/400/250",
      featured: true
    },
    {
      title: "Building Your First AI Agent with LangChain",
      excerpt: "A comprehensive tutorial on creating intelligent agents that can reason, plan, and execute complex tasks autonomously.",
      category: "Tutorials",
      author: "Marcus Rodriguez",
      date: "2024-01-12",
      readTime: "12 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      title: "Multi-Agent Systems: Orchestrating AI Collaboration",
      excerpt: "Exploring how multiple AI agents can work together to solve complex business problems more effectively than single agents.",
      category: "AI Research",
      author: "Dr. Emily Watson",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      title: "AI Agents in Healthcare: Transforming Patient Care",
      excerpt: "Real-world examples of how agentic AI is improving patient outcomes, reducing costs, and streamlining healthcare operations.",
      category: "Use Cases",
      author: "Michael Thompson",
      date: "2024-01-08",
      readTime: "10 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      title: "The Rise of Autonomous Business Processes",
      excerpt: "Industry analysis on how businesses are moving beyond traditional automation to fully autonomous AI-driven processes.",
      category: "Industry Trends",
      author: "Jennifer Martinez",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "/api/placeholder/400/250",
      featured: false
    },
    {
      title: "Implementing RAG in Production: Best Practices",
      excerpt: "Technical deep-dive into deploying Retrieval-Augmented Generation systems for enterprise-scale AI applications.",
      category: "Tutorials",
      author: "Alex Kumar",
      date: "2024-01-03",
      readTime: "15 min read",
      image: "/api/placeholder/400/250",
      featured: false
    }
  ];

  const popularPosts = [
    {
      title: "10 Signs Your Business Needs Agentic AI",
      readTime: "5 min read",
      date: "2024-01-01"
    },
    {
      title: "ROI Calculator: Measuring AI Agent Impact",
      readTime: "8 min read",
      date: "2023-12-28"
    },
    {
      title: "Common Mistakes in AI Agent Development",
      readTime: "6 min read",
      date: "2023-12-25"
    }
  ];

  const authors = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      posts: 12,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      posts: 8,
      image: "/api/placeholder/100/100"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      posts: 6,
      image: "/api/placeholder/100/100"
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find(post => post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              AI <span className="text-gradient">Insights</span> & Tutorials
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay ahead of the curve with expert insights, practical tutorials, 
              and industry analysis on agentic AI and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border"
                />
              </div>
              <Button className="btn-primary">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding">
          <div className="container-width">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
            </div>
            <Card className="card-gradient border-border glow-primary">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="bg-muted/20 h-64 lg:h-auto flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <div className="p-8">
                    <Badge className="mb-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Button className="btn-primary">
                      Read Full Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.filter(post => !post.featured).map((post, index) => (
                  <Card key={index} className="card-gradient border-border hover:glow-primary transition-all duration-300 group">
                    <CardContent className="p-0">
                      <div className="bg-muted/20 h-48 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Posts */}
              <Card className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={index} className="pb-4 border-b border-border/30 last:border-b-0">
                        <h4 className="font-medium mb-2 hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authors */}
              <Card className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Our Authors</h3>
                  <div className="space-y-4">
                    {authors.map((author, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{author.name}</h4>
                          <p className="text-xs text-muted-foreground">{author.role}</p>
                          <p className="text-xs text-muted-foreground">{author.posts} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="card-gradient border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest AI insights delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your email"
                      className="bg-background/50 border-border"
                    />
                    <Button className="btn-primary w-full">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;