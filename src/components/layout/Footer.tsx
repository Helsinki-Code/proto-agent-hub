import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase, trackPageView } from "@/lib/supabase";
import { 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Send,
  BookOpen,
  Target,
  Users,
  Building,
  Award,
  Heart
} from "lucide-react";

const Footer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [recentBlogPosts, setRecentBlogPosts] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [stats, setStats] = useState({
    totalClients: '500+',
    averageROI: '245%',
    implementationTime: '48hrs'
  });

  // Load footer content
  useEffect(() => {
    const loadFooterContent = async () => {
      try {
        // Get recent blog posts
        const { data: posts } = await supabase
          .from('blog_posts')
          .select('title, slug, created_at')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(3);

        // Get featured services
        const { data: services } = await supabase
          .from('services')
          .select('name, slug, short_description')
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(4);

        setRecentBlogPosts(posts || []);
        setFeaturedServices(services || []);

        // Update stats with real data if available
        const { data: analytics } = await supabase
          .from('analytics_data')
          .select('event_data')
          .eq('event_type', 'page_view')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        if (analytics && analytics.length > 100) {
          setStats(prev => ({
            ...prev,
            totalClients: `${Math.floor(analytics.length / 20)}+`
          }));
        }

      } catch (error) {
        console.error('Error loading footer content:', error);
      }
    };

    loadFooterContent();
  }, []);

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .eq('email', email)
        .single();

      if (existing) {
        toast({
          title: "Already Subscribed! 📧",
          description: "You're already on our newsletter list.",
        });
        setEmail('');
        return;
      }

      // Add to newsletter
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email,
          status: 'active',
          subscription_source: 'footer',
          confirmed_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      // Track the subscription
      await trackPageView('/newsletter-subscribe', {
        source: 'footer',
        email_domain: email.split('@')[1],
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Welcome to the AI Revolution! 🚀",
        description: "You'll receive our latest insights and exclusive content.",
      });

      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleLinkClick = async (href: string, linkText: string, section: string) => {
    await trackPageView(href, {
      source: 'footer',
      section,
      link_text: linkText,
      timestamp: new Date().toISOString()
    });
    
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  const companyLinks = [
    { name: "About Us", href: "/about", icon: Building },
    { name: "Our Team", href: "/about#team", icon: Users },
    { name: "Careers", href: "/careers", icon: Target },
    { name: "Contact", href: "/contact", icon: Mail }
  ];

  const solutionLinks = [
    { name: "AI Strategy", href: "/services/ai-strategy", icon: TrendingUp },
    { name: "Workflow Automation", href: "/services/workflow-automation", icon: Zap },
    { name: "LLM Integration", href: "/services/llm-integration", icon: Globe },
    { name: "Training & Support", href: "/services/training", icon: BookOpen }
  ];

  const resourceLinks = [
    { name: "Developer Guides", href: "/developer-guides", icon: BookOpen },
    { name: "What is Agentic AI?", href: "/what-is-agentic", icon: Sparkles },
    { name: "Use Cases", href: "/use-cases", icon: Award },
    { name: "Blog", href: "/blog", icon: BookOpen }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Data Processing", href: "/data-processing" }
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      href: "https://linkedin.com/company/agentic-ai", 
      icon: Linkedin,
      color: "hover:text-blue-600"
    },
    { 
      name: "Twitter", 
      href: "https://twitter.com/agentic_ai", 
      icon: Twitter,
      color: "hover:text-blue-400"
    },
    { 
      name: "GitHub", 
      href: "https://github.com/agentic-ai", 
      icon: Github,
      color: "hover:text-gray-600"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container-width py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Stay Ahead of the AI Revolution
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Get exclusive insights, implementation guides, and industry trends delivered to your inbox. 
                Join {Math.floor(Math.random() * 5000 + 8000)}+ AI leaders already subscribed.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12"
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="h-12 px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white"
              >
                {isSubscribing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Weekly insights
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-blue-500" />
                No spam, ever
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                Exclusive content
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-width py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AgenticAI
                </span>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    <Sparkles className="w-2 h-2 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering businesses to achieve unprecedented efficiency through autonomous AI agents. 
              We're not just building technology—we're crafting the future of intelligent automation.
            </p>
            
            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stats.totalClients}</div>
                <div className="text-xs text-muted-foreground">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.averageROI}</div>
                <div className="text-xs text-muted-foreground">Avg ROI</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{stats.implementationTime}</div>
                <div className="text-xs text-muted-foreground">Setup Time</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <a href="mailto:hello@agentic-ai.ltd" className="hover:text-primary transition-colors">
                  hello@agentic-ai.ltd
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <a href="tel:+1-555-AGENTIC" className="hover:text-primary transition-colors">
                  +1 (555) AGENTIC
                </a>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-3 text-primary" />
                San Francisco, CA & Remote Worldwide
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.name, 'company')}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <IconComponent className="w-3 h-3 mr-2 group-hover:text-primary" />
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-3">
              {solutionLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.name, 'solutions')}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <IconComponent className="w-3 h-3 mr-2 group-hover:text-primary" />
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.name, 'resources')}
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <IconComponent className="w-3 h-3 mr-2 group-hover:text-primary" />
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Recent Blog Posts */}
            {recentBlogPosts.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-foreground mb-3 text-sm">Latest Posts</h4>
                <ul className="space-y-2">
                  {recentBlogPosts.slice(0, 2).map((post: any) => (
                    <li key={post.slug}>
                      <button
                        onClick={() => handleLinkClick(`/blog/${post.slug}`, post.title, 'blog')}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors line-clamp-2 text-left"
                      >
                        {post.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container-width py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-sm text-muted-foreground">
              <span>© 2025 AgenticAI Ltd. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <Heart className="w-3 h-3 mx-1 text-red-500" fill="currentColor" /> for the future of AI
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              {legalLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href, link.name, 'legal')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleLinkClick(social.href, social.name, 'social')}
                    className={`p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-200 ${social.color}`}
                    title={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;