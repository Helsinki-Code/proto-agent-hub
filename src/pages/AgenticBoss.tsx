import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  Settings
} from 'lucide-react';

const AgenticBoss = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = sessionStorage.getItem('admin_auth');
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.isAuthenticated && parsed.username === 'agenticuniverse') {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.warn('Session storage check failed');
      }
    };
    
    checkAuth();
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

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin-boss/dashboard" replace />;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Account Temporarily Locked",
        description: `Please wait ${lockTimer} seconds before trying again.`,
        variant: "destructive",
      });
      return;
    }

    if (!formData.username || !formData.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Authentication delay for security
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check credentials
    const isValidLogin = formData.username === 'agenticuniverse' && formData.password === 'universeboss';

    if (isValidLogin) {
      setIsAuthenticated(true);
      
      // Store auth state
      try {
        sessionStorage.setItem('admin_auth', JSON.stringify({
          isAuthenticated: true,
          username: formData.username,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.warn('Session storage not available');
      }

      toast({
        title: "Welcome Back, Universe Boss! 👑",
        description: "Access granted. Loading your command center...",
      });
      
      setTimeout(() => {
        navigate('/admin-boss/dashboard');
      }, 1000);
    } else {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      if (newAttemptCount >= 3) {
        setIsLocked(true);
        setLockTimer(60);
        toast({
          title: "Too Many Failed Attempts",
          description: "Account locked for 60 seconds for security.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Invalid Credentials",
          description: `Access denied. ${3 - newAttemptCount} attempts remaining.`,
          variant: "destructive",
        });
      }
      
      setFormData({ username: '', password: '' });
    }

    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const quickStats = [
    { label: 'Total Control', value: '100%', icon: Crown, color: 'text-yellow-600' },
    { label: 'Site Performance', value: 'A+', icon: Zap, color: 'text-green-600' },
    { label: 'Active Users', value: '1.2K', icon: BarChart3, color: 'text-blue-600' },
    { label: 'Global Reach', value: '25+', icon: Globe, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
            <Crown className="w-10 h-10 text-white" />
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
                Secured
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                <Settings className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLocked && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-red-300 text-sm font-medium">
                  Access Temporarily Restricted
                </p>
                <p className="text-red-200 text-xs mt-1">
                  Unlock in: {formatTime(lockTimer)}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">
                  Universe Boss Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Enter your supreme username"
                    disabled={isSubmitting || isLocked}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Master Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your boss-level password"
                    disabled={isSubmitting || isLocked}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
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
              <p className="text-yellow-400">⚡ Real-time dashboard ready</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>AgenticAI Universe Boss Portal v2.0</p>
          <p>🌟 "Control the universe of AI automation"</p>
        </div>
      </div>
    </div>
  );
};

export default AgenticBoss;