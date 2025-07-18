import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Globe, 
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Shield,
  Bell,
  Search
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3); // You can make this dynamic later

  const handleLogout = () => {
    logout();
    navigate('/agentic-boss');
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/agentic-boss/dashboard',
      icon: LayoutDashboard,
      description: 'Overview & quick actions'
    },
    {
      title: 'Blog Management',
      href: '/agentic-boss/blog',
      icon: FileText,
      description: 'Posts, categories & publishing'
    },
    {
      title: 'Resources Hub',
      href: '/agentic-boss/resources',
      icon: BookOpen,
      description: 'Downloads, guides & tools'
    },
    {
      title: 'Services Portfolio',
      href: '/agentic-boss/services',
      icon: Briefcase,
      description: 'Service offerings & pricing'
    },
    {
      title: 'Use Cases Gallery',
      href: '/agentic-boss/use-cases',
      icon: TrendingUp,
      description: 'Success stories & case studies'
    },
    {
      title: 'Page Content',
      href: '/agentic-boss/pages',
      icon: Globe,
      description: 'Static pages & content'
    },
    {
      title: 'Analytics',
      href: '/agentic-boss/analytics',
      icon: BarChart3,
      description: 'Performance & insights'
    }
  ];

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  AgenticAI Admin
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Control Center</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search - you can implement this later */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.username}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
              </div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          fixed top-16 left-0 bottom-0 z-40 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
        `}>
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`
                      flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)} // Close sidebar on mobile after navigation
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-slate-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : ''}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <p className="text-sm font-medium text-slate-900 dark:text-white">System Status</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">API Status</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Last Backup</span>
                    <span className="text-slate-600 dark:text-slate-400">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:ml-0">
          <div className="max-w-7xl mx-auto">
            {/* Quick Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <span>Admin</span>
                <span>/</span>
                <span className="text-slate-900 dark:text-white font-medium">
                  {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                </span>
              </div>
            </div>
            
            {/* Page Content */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;