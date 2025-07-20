import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User,
  AlertTriangle,
  CheckCircle,
  Crown,
  Zap,
  BarChart3,
  Globe,
  Settings,
  Activity,
  Database
} from 'lucide-react';

const AgenticBoss = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, login, isLoading } = useAdminAuth();
  const [formData, setFormData] = useState({
    identifier: '', // Can be either email or username
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    siteViews: 0,
    systemStatus: 'Online'
  });

  // Redirect if already authenticated - FIXED ROUTE
  if (isAuthenticated) {
    return <Navigate to="/agentic-boss/dashboard" replace />;
  }

  // Load real-time stats from Supabase
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Get blog posts count
        const { count: postsCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });

        // Get admin users count
        const { count: usersCount } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });

        // Get site views from analytics
        const { data: analyticsData } = await supabase
          .from('analytics_data')
          .select('event_data')
          .eq('event_type', 'page_view')
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

        setStats({
          totalPosts: postsCount || 0,
          totalUsers: usersCount || 0,
          siteViews: analyticsData?.length || 0,
          systemStatus: 'Online'
        });
      } catch (error) {
        console.error('Error loading stats:', error);
        setStats(prev => ({ ...prev, systemStatus: 'Error' }));
      }
    };

    loadStats();

    // Set up real-time subscriptions for stats
    const postsSubscription = supabase
      .channel('blog_posts_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'blog_posts' },
        () => loadStats()
      )
      .subscribe();

    const analyticsSubscription = supabase
      .channel('analytics_changes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'analytics_data' },
        () => loadStats()
      )
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
      analyticsSubscription.unsubscribe();
    };
  }, []);

  // Lockout timer
  useEffect(() => {
    if (lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer(lockTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimer === 0) {
      setIsLocked(false);
      setAttemptCount(0);
    }
  }, [lockTimer, isLocked]);

  const quickStats = [
    {
      label: "Blog Posts",
      value: stats.totalPosts,
      icon: BarChart3,
      color: "text-blue-400"
    },
    {
      label: "Admin Users",
      value: stats.totalUsers,
      icon: User,
      color: "text-green-400"
    },
    {
      label: "Today's Views",
      value: stats.siteViews,
      icon: Activity,
      color: "text-yellow-400"
    },
    {
      label: "System Status",
      value: stats.systemStatus,
      icon: Database,
      color: stats.systemStatus === 'Online' ? "text-green-400" : "text-red-400"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Account Temporarily Locked 🔒",
        description: `Please wait ${lockTimer} seconds before trying again.`,
        variant: "destructive",
      });
      return;
    }

    if (!formData.identifier || !formData.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username/email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const loginSuccess = await login(formData.identifier, formData.password);

      if (loginSuccess) {
        toast({
          title: "Welcome Back, Universe Boss! 👑",
          description: "Access granted to command center.",
        });
        
        // Track successful login
        await supabase
          .from('analytics_data')
          .insert({
            event_type: 'admin_login_success',
            event_data: { identifier: formData.identifier },
            created_at: new Date().toISOString(),
          });

        navigate('/agentic-boss/dashboard');
      } else {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        // Track failed login
        await supabase
          .from('analytics_data')
          .insert({
            event_type: 'admin_login_failed',
            event_data: { 
              identifier: formData.identifier,
              attempt_count: newAttemptCount 
            },
            created_at: new Date().toISOString(),
          });

        if (newAttemptCount >= 3) {
          setIsLocked(true);
          setLockTimer(300); // 5 minutes lockout
          toast({
            title: "Multiple Failed Attempts 🚨",
            description: "Account locked for 5 minutes for security.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Access Denied ❌",
            description: `Invalid credentials. ${3 - newAttemptCount} attempts remaining.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "System Error",
        description: "Authentication system temporarily unavailable.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Initializing Universe Boss Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Universe Boss Portal
          </h1>
          <p className="text-gray-300">
            AgenticAI Supreme Command Center
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <div>
                  <p className="text-xs text-gray-300">{stat.label}</p>
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center space-x-2">
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                <CheckCircle className="w-3 h-3 mr-1" />
                Encrypted
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                <Lock className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                <Database className="w-3 h-3 mr-1" />
                Supabase
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLocked && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-red-300 text-sm font-medium">
                  Security Lockout Active
                </p>
                <p className="text-red-400 text-xs">
                  {Math.floor(lockTimer / 60)}:{(lockTimer % 60).toString().padStart(2, '0')} remaining
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifier" className="text-white text-sm font-medium mb-2 block">
                  Username or Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="agenticuniverse or info@agentic-ai.ltd"
                    value={formData.identifier}
                    onChange={(e) => handleInputChange('identifier', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                    disabled={isSubmitting || isLocked}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-white text-sm font-medium mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your universe boss password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                    disabled={isSubmitting || isLocked}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isSubmitting || isLocked}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {attemptCount > 0 && !isLocked && (
                <div className="text-center text-orange-300 text-sm">
                  ⚠️ {attemptCount}/3 failed attempts
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 hover:from-yellow-600 hover:via-orange-600 hover:to-red-700 text-white font-bold py-3 shadow-lg"
                disabled={isSubmitting || isLocked}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating Boss Level...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Enter Command Center
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-gray-400 space-y-1">
              <p>🔒 Universe Boss Access Only</p>
              <p>All activities monitored and logged</p>
              <p className="text-yellow-400">⚡ Real-time Supabase powered</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>AgenticAI Universe Boss Portal v3.0</p>
          <p>🌟 "Control the universe of AI automation"</p>
          <p className="text-green-400">🚀 Now with real-time Supabase integration</p>
        </div>
      </div>
    </div>
  );
};

export default AgenticBoss;