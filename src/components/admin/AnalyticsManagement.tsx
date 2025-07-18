import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Globe, 
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  AlertCircle,
  CheckCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

interface CloudflareAnalytics {
  zone_analytics: {
    totals: {
      requests: {
        all: number;
        cached: number;
        uncached: number;
      };
      bandwidth: {
        all: number;
        cached: number;
        uncached: number;
      };
      uniques: {
        all: number;
      };
      threats: {
        all: number;
      };
      pageviews: {
        all: number;
      };
    };
    timeseries: Array<{
      since: string;
      until: string;
      requests: {
        all: number;
        cached: number;
        uncached: number;
      };
      bandwidth: {
        all: number;
        cached: number;
        uncached: number;
      };
      uniques: {
        all: number;
      };
      threats: {
        all: number;
      };
    }>;
  };
  web_analytics?: {
    pageviews: number;
    visits: number;
    bounce_rate: number;
    page_views_per_visit: number;
    avg_visit_duration: number;
    top_pages: Array<{
      page: string;
      visits: number;
    }>;
    top_referrers: Array<{
      referrer: string;
      visits: number;
    }>;
    countries: Array<{
      country: string;
      visits: number;
    }>;
    browsers: Array<{
      browser: string;
      visits: number;
    }>;
    devices: Array<{
      device_type: string;
      visits: number;
    }>;
  };
}

const AnalyticsManagement = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<CloudflareAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState('7d');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('testing');

  // Cloudflare API configuration
  const CLOUDFLARE_TOKEN = 'nRdhxI6asta7BJ18nb1BX5_f_Ys-AABeHkftwsPX';
  const ACCOUNT_ID = '382bacfdd564e47b87a77f6acf7c9a52'; // From the test URL you provided
  
  // Test Cloudflare connection
  const testConnection = async () => {
    setConnectionStatus('testing');
    try {
      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/tokens/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setConnectionStatus('connected');
          toast({
            title: "Cloudflare Connected! 🎉",
            description: "Successfully connected to your Cloudflare Analytics.",
          });
          return true;
        }
      }
      throw new Error('Authentication failed');
    } catch (err) {
      setConnectionStatus('disconnected');
      setError('Failed to connect to Cloudflare Analytics');
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Cloudflare Analytics. Check your token.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Fetch zones (websites) from Cloudflare
  const fetchZones = async () => {
    try {
      const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch zones');
      
      const data = await response.json();
      return data.result || [];
    } catch (err) {
      console.error('Error fetching zones:', err);
      return [];
    }
  };

  // Fetch analytics data from Cloudflare
  const fetchAnalytics = async () => {
    if (connectionStatus !== 'connected') {
      const connected = await testConnection();
      if (!connected) return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get zones first
      const zones = await fetchZones();
      if (zones.length === 0) {
        throw new Error('No zones found in your Cloudflare account');
      }

      // Use the first zone (your main domain)
      const zone = zones[0];
      const zoneId = zone.id;

      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      const days = parseInt(dateRange.replace('d', ''));
      startDate.setDate(endDate.getDate() - days);

      // Fetch zone analytics
      const analyticsResponse = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/analytics/dashboard?` + 
        `since=${startDate.toISOString()}&until=${endDate.toISOString()}`,
        {
          headers: {
            'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!analyticsResponse.ok) {
        throw new Error(`Analytics API error: ${analyticsResponse.status}`);
      }

      const analyticsData = await analyticsResponse.json();

      // Try to fetch Web Analytics if available
      let webAnalyticsData = null;
      try {
        const webAnalyticsResponse = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/rum/site_info/${zoneId}`,
          {
            headers: {
              'Authorization': `Bearer ${CLOUDFLARE_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (webAnalyticsResponse.ok) {
          const webData = await webAnalyticsResponse.json();
          webAnalyticsData = webData.result;
        }
      } catch (webErr) {
        console.log('Web Analytics not available or not configured');
      }

      const combinedData: CloudflareAnalytics = {
        zone_analytics: analyticsData.result,
        web_analytics: webAnalyticsData
      };

      setAnalytics(combinedData);
      setLastUpdate(new Date());
      
      toast({
        title: "Analytics Updated! 📊",
        description: `Latest data from ${zone.name} loaded successfully.`,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics';
      setError(errorMessage);
      toast({
        title: "Analytics Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchAnalytics();
    
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dateRange]);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatBytes = (bytes: number) => {
    if (bytes >= 1e9) return (bytes / 1e9).toFixed(2) + ' GB';
    if (bytes >= 1e6) return (bytes / 1e6).toFixed(2) + ' MB';
    if (bytes >= 1e3) return (bytes / 1e3).toFixed(2) + ' KB';
    return bytes + ' B';
  };

  const getCacheRatio = (cached: number, total: number) => {
    return total > 0 ? ((cached / total) * 100).toFixed(1) : '0';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights from Cloudflare Analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            {connectionStatus === 'connected' ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Connected</span>
              </div>
            ) : connectionStatus === 'disconnected' ? (
              <div className="flex items-center space-x-1 text-red-600">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Disconnected</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-yellow-600">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm">Testing...</span>
              </div>
            )}
          </div>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button 
            onClick={fetchAnalytics} 
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      {connectionStatus === 'disconnected' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Cloudflare Connection Failed</p>
                <p className="text-sm text-red-600">
                  Unable to connect to Cloudflare Analytics. Please check your API token and account permissions.
                </p>
              </div>
              <Button onClick={testConnection} variant="outline" size="sm">
                Retry Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && !analytics && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold mb-2">Loading Analytics...</h3>
            <p className="text-muted-foreground">Fetching data from Cloudflare</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Analytics Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchAnalytics} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Analytics Dashboard */}
      {analytics && (
        <>
          {/* Last Updated */}
          {lastUpdate && (
            <div className="text-center text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleString()}
            </div>
          )}

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Requests</p>
                    <p className="text-xl font-bold">
                      {formatNumber(analytics.zone_analytics.totals.requests.all)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Unique Visitors</p>
                    <p className="text-xl font-bold">
                      {formatNumber(analytics.zone_analytics.totals.uniques.all)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bandwidth</p>
                    <p className="text-xl font-bold">
                      {formatBytes(analytics.zone_analytics.totals.bandwidth.all)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cache Ratio</p>
                    <p className="text-xl font-bold">
                      {getCacheRatio(
                        analytics.zone_analytics.totals.requests.cached,
                        analytics.zone_analytics.totals.requests.all
                      )}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Web Analytics (if available) */}
          {analytics.web_analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Page Views</p>
                      <p className="text-xl font-bold">
                        {formatNumber(analytics.web_analytics.pageviews)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visits</p>
                      <p className="text-xl font-bold">
                        {formatNumber(analytics.web_analytics.visits)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Duration</p>
                      <p className="text-xl font-bold">
                        {Math.round(analytics.web_analytics.avg_visit_duration / 60)}m
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bounce Rate</p>
                      <p className="text-xl font-bold">
                        {(analytics.web_analytics.bounce_rate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Top Pages */}
          {analytics.web_analytics?.top_pages && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.web_analytics.top_pages.slice(0, 10).map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{page.page || '/'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(page.visits)}</p>
                        <p className="text-xs text-muted-foreground">visits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Traffic Sources */}
          {analytics.web_analytics?.top_referrers && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Top Referrers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.web_analytics.top_referrers.slice(0, 10).map((referrer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {referrer.referrer || 'Direct'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(referrer.visits)}</p>
                        <p className="text-xs text-muted-foreground">visits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Geographic Data */}
          {analytics.web_analytics?.countries && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.web_analytics.countries.slice(0, 10).map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{country.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatNumber(country.visits)}</p>
                        <p className="text-xs text-muted-foreground">visits</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Stats */}
          {analytics.zone_analytics.totals.threats.all > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">
                      {formatNumber(analytics.zone_analytics.totals.threats.all)}
                    </p>
                    <p className="text-sm text-muted-foreground">Threats Blocked</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(analytics.zone_analytics.totals.requests.all - analytics.zone_analytics.totals.threats.all)}
                    </p>
                    <p className="text-sm text-muted-foreground">Clean Requests</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {(((analytics.zone_analytics.totals.requests.all - analytics.zone_analytics.totals.threats.all) / analytics.zone_analytics.totals.requests.all) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Clean Traffic</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AnalyticsManagement;