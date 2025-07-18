import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
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
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const [stats, setStats] = useState({
    totalPosts: 12,
    totalResources: 8,
    totalServices: 6,
    totalUseCases: 7,
    recentActivity: 24,
    siteViews: 1420
  });

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        siteViews: prev.siteViews + Math.floor(Math.random() * 3),
        recentActivity: prev.recentActivity + Math.floor(Math.random() * 2)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const managementSections = [
    {
      title: "Blog Management",
      description: "Create, edit, and manage blog posts",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      count: stats.totalPosts,
      route: "/agentic-boss/blog",
      actions: ["View All", "Create New", "Manage Categories"]
    },
    {
      title: "Resources Hub",
      description: "Manage downloadable resources and guides",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
      count: stats.totalResources,
      route: "/agentic-boss/resources",
      actions: ["View Library", "Add Resource", "Update Categories"]
    },
    {
      title: "Services Portfolio",
      description: "Update service offerings and pricing",
      icon: Briefcase,
      color: "from-purple-500 to-purple-600",
      count: stats.totalServices,
      route: "/agentic-boss/services",
      actions: ["Manage Services", "Update Pricing", "Edit Features"]
    },
    {
      title: "Use Cases Gallery",
      description: "Showcase client success stories",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      count: stats.totalUseCases,
      route: "/agentic-boss/use-cases",
      actions: ["View Cases", "Add New", "Update Metrics"]
    },
    {
      title: "Page Content",
      description: "Edit static page content and copy",
      icon: Globe,
      color: "from-indigo-500 to-indigo-600",
      count: "∞",
      route: "/agentic-boss/pages",
      actions: ["Edit Pages", "Update Copy", "Manage SEO"]
    },
    {
      title: "Site Analytics",
      description: "Monitor performance and user engagement",
      icon: BarChart3,
      color: "from-red-500 to-red-600",
      count: stats.siteViews,
      route: "/agentic-boss/analytics",
      actions: ["View Reports", "Export Data", "Set Goals"]
    }
  ];

  const recentActivities = [
    { action: "Blog post published", item: "The Future of Agentic AI", time: "2 minutes ago", type: "create" },
    { action: "Service updated", item: "LLM Integration pricing", time: "1 hour ago", type: "edit" },
    { action: "Resource added", item: "AI Implementation Guide", time: "3 hours ago", type: "create" },
    { action: "Use case modified", item: "Healthcare automation", time: "5 hours ago", type: "edit" },
    { action: "Page content updated", item: "About Us section", time: "1 day ago", type: "edit" }
  ];

  const quickActions = [
    { title: "New Blog Post", icon: Plus, action: () => navigate('/agentic-boss/blog/new'), color: "bg-blue-500" },
    { title: "Add Resource", icon: Plus, action: () => navigate('/agentic-boss/resources/new'), color: "bg-green-500" },
    { title: "Update Service", icon: Edit, action: () => navigate('/agentic-boss/services'), color: "bg-purple-500" },
    { title: "View Analytics", icon: Activity, action: () => navigate('/agentic-boss/analytics'), color: "bg-red-500" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-gradient">{user?.username}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your AgenticAI control center • Last login: Today at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.siteViews}</div>
            <div className="text-sm text-muted-foreground">Site views today</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

        <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-700">{stats.recentActivity}</div>
            <div className="text-xs text-indigo-600">Activities</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200">
          <CardContent className="p-4 text-center">
            <Globe className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-700">{stats.siteViews}</div>
            <div className="text-xs text-red-600">Site Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`${action.color} hover:opacity-90 text-white p-6 h-auto flex flex-col items-center space-y-2`}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(section.route)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm">
                  {section.count}
                </Badge>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'create' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'create' ? <Plus className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.item}</div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;