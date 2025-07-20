import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase, AdminUser } from "@/lib/supabase";
import bcrypt from 'bcryptjs';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  user: AdminUser | null;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if there's a stored session
        const storedSession = localStorage.getItem('agentic_admin_session');
        if (storedSession) {
          const sessionData = JSON.parse(storedSession);
          const expiryTime = new Date(sessionData.expiresAt);
          
          if (expiryTime > new Date()) {
            // Session is still valid, fetch user data
            await fetchUserData(sessionData.userId);
          } else {
            // Session expired, clean up
            localStorage.removeItem('agentic_admin_session');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('agentic_admin_session');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data: userData, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
        .single();

      if (error || !userData) {
        throw new Error('User not found or inactive');
      }

      setUser(userData);
      setIsAuthenticated(true);
      
      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);
        
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('agentic_admin_session');
    }
  };

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Query user by email or username
      const { data: userData, error } = await supabase
        .from('admin_users')
        .select('*')
        .or(`email.eq.${identifier},username.eq.${identifier}`)
        .eq('is_active', true)
        .single();

      if (error || !userData) {
        console.error('User not found:', error);
        return false;
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
      
      if (!isPasswordValid) {
        console.error('Invalid password');
        return false;
      }

      // Create session
      const sessionData = {
        userId: userData.id,
        username: userData.username,
        email: userData.email,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('agentic_admin_session', JSON.stringify(sessionData));
      
      setUser(userData);
      setIsAuthenticated(true);

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userData.id);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('agentic_admin_session');
      
      // Optional: Track logout event
      if (user) {
        await supabase
          .from('analytics_data')
          .insert({
            event_type: 'admin_logout',
            event_data: { user_id: user.id, username: user.username },
            created_at: new Date().toISOString(),
          });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUser = async (): Promise<void> => {
    if (user?.id) {
      await fetchUserData(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

// Utility function to hash passwords (for initial setup)
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Utility function to check if user has specific role
export const hasRole = (user: AdminUser | null, requiredRole: string): boolean => {
  if (!user) return false;
  
  const roleHierarchy = {
    'super_admin': 4,
    'admin': 3,
    'editor': 2,
    'contributor': 1,
  };
  
  const userRoleLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
  
  return userRoleLevel >= requiredRoleLevel;
};

// HOC for role-based access control
export const withRoleAccess = (requiredRole: string) => {
  return (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
      const { user } = useAdminAuth();
      
      if (!hasRole(user, requiredRole)) {
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to access this resource.</p>
            </div>
          </div>
        );
      }
      
      return <WrappedComponent {...props} />;
    };
  };
};