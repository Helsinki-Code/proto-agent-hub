import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, login } = useAdminAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/agentic-boss/dashboard" replace />;
  }

  // Lockout timer effect
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

    // Simulate authentication delay for security
    await new Promise(resolve => setTimeout(resolve, 1500));

    const loginSuccess = login(formData.username, formData.password);

    if (loginSuccess) {
      toast({
        title: "Welcome Back! 🎉",
        description: "Access granted. Redirecting to admin dashboard...",
      });
      
      setTimeout(() => {
        navigate('/agentic-boss/dashboard');
      }, 1000);
    } else {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);
      
      if (newAttemptCount >= 3) {
        setIsLocked(true);
        setLockTimer(60); // 60 second lockout
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
      
      // Clear form on failed attempt
      setFormData({ username: '', password: '' });
    }

    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Admin Access Portal
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Secure gateway to AgenticAI control center
            </p>
          </div>
          
          <div className="flex justify-center space-x-2">
            <Badge variant="outline" className="text-green-400 border-green-400/50">
              <CheckCircle className="w-3 h-3 mr-1" />
              Encrypted
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400/50">
              <Lock className="w-3 h-3 mr-1" />
              Secured
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLocked && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-red-300 text-sm font-medium">
                Account Locked
              </p>
              <p className="text-red-200 text-xs mt-1">
                Unlock in: {formatTime(lockTimer)}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Enter admin username"
                  disabled={isSubmitting || isLocked}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter admin password"
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
                {attemptCount}/3 failed attempts
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
              disabled={isSubmitting || isLocked}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Access Dashboard
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-xs text-gray-400 space-y-1">
            <p>Authorized personnel only</p>
            <p>All access attempts are logged and monitored</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;