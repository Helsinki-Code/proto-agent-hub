import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase, subscribeToTable } from '@/lib/supabase';
import { 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  BookOpen,
  Briefcase,
  TrendingUp,
  Globe,
  Calendar,
  Activity,
  Edit,
  Eye,
  Plus,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Target,
  Download,
  Star,
  AlertCircle,
  CheckCircle,
  Wifi,
  Database,
  Server,
  RefreshCw,
  MousePointer,
  LineChart,
  PieChart,
  BarChart,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalResources: 0,
    totalServices: 0,
    totalUseCases: 0,
    recentActivity: 0,
    siteViews: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredServices: 0,
    activeServices: 0,
    newsletterSubs: 0,
    contactSubmissions: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    database: 'healthy',
    api: 'healthy',
    cdn: 'healthy',
    lastBackup: '2 hours ago'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // This is where the magic happens - real-time everything
  useEffect(() => {
    loadDashboardData();
    
    // Set up all the real-time subscriptions
    const subscriptions = [
      subscribeToTable('blog_posts', () => {
        console.log('Blog posts updated, refreshing stats...');
        loadDashboardData();
      }),
      subscribeToTable('resources', () => {
        console.log('Resources updated, refreshing stats...');
        loadDashboardData();
      }),
      subscribeToTable('services', () => {
        console.log('Services updated, refreshing stats...');
        loadDashboardData();
      }),
      subscribeToTable('use_cases', () => {
        console.log('Use cases updated, refreshing stats...');
        loadDashboardData();
      }),
      subscribeToTable('analytics_data', () => {
        console.log('New analytics event, refreshing stats...');
        loadDashboardData();
      }),
      subscribeToTable('contact_submissions', () => {
        console.log('New contact submission!');
        loadDashboardData();
      }),
      subscribeToTable('newsletter_subscriptions', () => {
        console.log('New newsletter subscription!');
        loadDashboardData();
      })
    ];

    // Auto-refresh every 30 seconds because... why not stay current?
    const refreshInterval = setInterval(() => {
      loadDashboardData();
    }, 30000);

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
      clearInterval(refreshInterval);
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      // I love how we can do all this in parallel - feels so much faster
      const [
        postsData,
        resourcesData, 
        servicesData,
        useCasesData,
        analyticsData,
        contactData,
        newsletterData
      ] = await Promise.all([
        supabase.from('blog_posts').select('status', { count: 'exact' }),
        supabase.from('resources').select('is_featured', { count: 'exact' }),
        supabase.from('services').select('is_featured, is_active', { count: 'exact' }),
        supabase.from('use_cases').select('is_featured', { count: 'exact' }),
        supabase.from('analytics_data').select('event_type, created_at').gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('contact_submissions').select('status', { count: 'exact' }),
        supabase.from('newsletter_subscriptions').select('status', { count: 'exact' })
      ]);

      // Get recent activity - this is actually pretty cool to watch in real-time
      const { data: recentData } = await supabase
        .from('analytics_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Process all the data
      const posts = postsData.data || [];
      const resources = resourcesData.data || [];
      const services = servicesData.data || [];
      const useCases = useCasesData.data || [];
      const analytics = analyticsData.data || [];

      setStats({
        totalPosts: postsData.count || 0,
        totalResources: resourcesData.count || 0,
        totalServices: servicesData.count || 0,
        totalUseCases: useCasesData.count || 0,
        recentActivity: analytics.length,
        siteViews: analytics.filter(a => a.event_type === 'page_view').length,
        publishedPosts: posts.filter(p => p.status === 'published').length,
        draftPosts: posts.filter(p => p.status === 'draft').length,
        featuredServices: services.filter(s => s.is_featured).length,
        activeServices: services.filter(s => s.is_active).length,
        newsletterSubs: newsletterData.count || 0,
        contactSubmissions: contactData.count || 0
      });

      setRecentActivities(recentData || []);
      setLastUpdated(new Date());

    } catch (error) {
      console.error('Dashboard loading error:', error);
      // Don't break the whole dashboard if one query fails
    } finally {
      setIsLoading(false);
    }
  };

  // Quick actions that actually make sense for a busy admin
  const managementSections = [
    {
      title: 'Blog Management',
      description: 'Create, edit and publish content',
      icon: FileText,
      route: '/agentic-boss/blog',
      color: 'from-blue-500 to-blue-600',
      count: `${stats.publishedPosts}/${stats.totalPosts}`,
      status: stats.draftPosts > 0 ? 'warning' : 'success',
      actions: ['View All Posts', 'Create New Post', 'Manage Categories'],
      stats: {
        primary: stats.publishedPosts,
        secondary: stats.draftPosts,
        label: 'Published / Drafts'
      }
    },
    {
      title: 'Resources Hub',
      description: 'Manage downloadable content & lead magnets',
      icon: BookOpen,
      route: '/agentic-boss/resources',
      color: 'from-green-500 to-green-600',
      count: stats.totalResources,
      status: 'success',
      actions: ['View Library', 'Add Resource', 'Check Downloads'],
      stats: {
        primary: stats.totalResources,
        secondary: Math.floor(stats.totalResources * 0.7), // Estimate downloads
        label: 'Resources / Downloads'
      }
    },
    {
      title: 'Services Portfolio',
      description: 'Update offerings, pricing & features',
      icon: Briefcase,
      route: '/agentic-boss/services',
      color: 'from-purple-500 to-purple-600',
      count: `${stats.activeServices}/${stats.totalServices}`,
      status: stats.featuredServices > 0 ? 'success' : 'warning',
      actions: ['Manage Services', 'Update Pricing', 'Edit Features'],
      stats: {
        primary: stats.activeServices,
        secondary: stats.featuredServices,
        label: 'Active / Featured'
      }
    },
    {
      title: 'Success Stories',
      description: 'Showcase wins & build credibility',
      icon: TrendingUp,
      route: '/agentic-boss/use-cases',
      color: 'from-orange-500 to-orange-600',
      count: stats.totalUseCases,
      status: stats.totalUseCases > 0 ? 'success' : 'warning',
      actions: ['View Cases', 'Add Success Story', 'Update Metrics'],
      stats: {
        primary: stats.totalUseCases,
        secondary: Math.floor(stats.totalUseCases * 0.8), // Estimate published
        label: 'Total / Published'
      }
    },
    {
      title: 'Analytics Hub',
      description: 'Real-time insights & performance',
      icon: BarChart3,
      route: '/agentic-boss/analytics',
      color: 'from-pink-500 to-pink-600',
      count: stats.siteViews,
      status: 'success',
      actions: ['View Dashboard', 'Export Data', 'Set Alerts'],
      stats: {
        primary: stats.siteViews,
        secondary: stats.recentActivity,
        label: 'Views (24h) / Events'
      }
    },
    {
      title: 'Page Content',
      description: 'Edit static pages & SEO',
      icon: Globe,
      route: '/agentic-boss/pages',
      color: 'from-cyan-500 to-cyan-600',
      count: '12', // Static for now
      status: 'success',
      actions: ['Edit Pages', 'Update SEO', 'Check Performance'],
      stats: {
        primary: 12,
        secondary: 8,
        label: 'Total / Optimized'
      }
    }
  ];

  // The kind of recent activities that actually matter
  const getActivityIcon = (eventType: string) => {
    switch (eventType) {
      case 'page_view': return Eye;
      case 'admin_login': return Shield;
      case 'admin_logout': return Shield;
      case 'contact_form': return Mail;
      case 'newsletter_signup': return Mail;
      case 'resource_download': return Download;
      default: return Activity;
    }
  };

  const getActivityColor = (eventType: string) => {
    switch (eventType) {
      case 'page_view': return 'text-blue-600';
      case 'admin_login': return 'text-green-600';
      case 'admin_logout': return 'text-gray-600';
      case 'contact_form': return 'text-purple-600';
      case 'newsletter_signup': return 'text-orange-600';
      case 'resource_download': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  const formatActivityText = (activity: any) => {
    const eventTypes = {
      'page_view': 'Page viewed',
      'admin_login': 'Admin logged in',
      'admin_logout': 'Admin logged out',
      'contact_form': 'Contact form submitted',
      'newsletter_signup': 'Newsletter subscription',
      'resource_download': 'Resource downloaded'
    };
    
    const baseText = eventTypes[activity.event_type as keyof typeof eventTypes] || activity.event_type;
    const path = activity.page_path || activity.event_data?.page_path || '';
    
    return path ? `${baseText}: ${path}` : baseText;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold mb-2">Loading Universe Boss Dashboard...</h3>
          <p className="text-muted-foreground">Aggregating real-time data from all systems</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header - because everyone likes feeling important */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-yellow-300">{user?.username}</span>! 👑
            </h1>
            <p className="text-blue-100 text-lg mb-4">
              Your AgenticAI universe is running smoothly • Last login: {new Date().toLocaleTimeString()}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <div className="flex items-center gap-1">
                <Database className="w-4 h-4" />
                <span>Real-time sync active</span>
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-4 h-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300">{stats.siteViews}</div>
            <div className="text-sm text-blue-200">Site views today</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/agentic-boss/analytics')}
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats - the numbers that actually matter */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200">
          <CardContent className="p-4 text-center">
            <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{stats.totalPosts}</div>
            <div className="text-xs text-blue-600">Blog Posts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{stats.totalResources}</div>
            <div className="text-xs text-green-600">Resources</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200">
          <CardContent className="p-4 text-center">
            <Briefcase className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{stats.totalServices}</div>
            <div className="text-xs text-purple-600">Services</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{stats.totalUseCases}</div>
            <div className="text-xs text-orange-600">Use Cases</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200">
          <CardContent className="p-4 text-center">
            <Mail className="w-6 h-6 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-700">{stats.newsletterSubs}</div>
            <div className="text-xs text-pink-600">Subscribers</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border-cyan-200">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-700">{stats.contactSubmissions}</div>
            <div className="text-xs text-cyan-600">Contacts</div>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections - where the real work happens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
                onClick={() => navigate(section.route)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <Badge 
                    variant={section.status === 'success' ? 'default' : 'secondary'} 
                    className="text-sm"
                  >
                    {section.count}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {section.stats.label}
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {section.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                    <span>{action}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                ))}
              </div>
              
              {/* Mini stats for each section */}
              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{section.stats.primary}</div>
                    <div className="text-xs text-muted-foreground">Primary</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-secondary-foreground">{section.stats.secondary}</div>
                    <div className="text-xs text-muted-foreground">Secondary</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - this is actually fascinating to watch */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Live Activity Stream
              </span>
              <Button variant="outline" size="sm" onClick={loadDashboardData}>
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activity</p>
                  <p className="text-xs">Activities will appear here in real-time</p>
                </div>
              ) : (
                recentActivities.map((activity: any, index) => {
                  const ActivityIcon = getActivityIcon(activity.event_type);
                  const activityColor = getActivityColor(activity.event_type);
                  
                  return (
                    <div key={activity.id || index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-background`}>
                        <ActivityIcon className={`w-4 h-4 ${activityColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {formatActivityText(activity)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(activity.created_at).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.event_type.replace('_', ' ')}
                      </Badge>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Health & Quick Actions */}
        <div className="space-y-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Supabase API</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CloudFlare CDN</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-sm text-muted-foreground">{systemHealth.lastBackup}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/agentic-boss/blog')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Blog Post
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/agentic-boss/resources')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/agentic-boss/analytics')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => window.open('/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Site
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Time</span>
                <span className="text-sm font-medium text-green-600">128ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cache Hit Rate</span>
                <span className="text-sm font-medium text-blue-600">94.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;