import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Volume2,
  ArrowRight,
  Clock,
  Users,
  Zap,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Settings,
  Target
} from "lucide-react";

const WatchDemo = () => {
  const { toast } = useToast();
  const [activeDemo, setActiveDemo] = useState("workflow");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewerCount, setViewerCount] = useState(127);
  const [demoStats, setDemoStats] = useState({
    totalViews: 15420,
    avgRating: 4.9,
    completionRate: 87
  });

  // Simulate live viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate demo progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            toast({
              title: "Demo Complete!",
              description: "Ready to implement this for your business?",
            });
            return 100;
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, toast]);

  const demos = [
    {
      id: "workflow",
      title: "Workflow Automation",
      description: "Watch AI agents automate complex business processes",
      duration: "3:24",
      icon: Settings,
      features: ["Multi-step automation", "Real-time decision making", "Exception handling"]
    },
    {
      id: "chatbot",
      title: "AI Chatbot",
      description: "See intelligent customer service in action",
      duration: "2:45",
      icon: MessageSquare,
      features: ["Natural conversations", "Context awareness", "Multi-language support"]
    },
    {
      id: "analytics",
      title: "Predictive Analytics",
      description: "Real-time data analysis and predictions",
      duration: "4:12",
      icon: BarChart3,
      features: ["Pattern recognition", "Forecasting", "Automated insights"]
    },
    {
      id: "optimization",
      title: "Process Optimization",
      description: "AI-driven efficiency improvements",
      duration: "3:18",
      icon: Target,
      features: ["Performance monitoring", "Continuous improvement", "ROI tracking"]
    }
  ];

  const activeDemo_data = demos.find(d => d.id === activeDemo);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentTime === 100) {
      setCurrentTime(0);
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              See AI <span className="text-gradient">In Action</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Watch live demonstrations of our AI agents transforming business operations in real-time.
            </p>
            
            {/* Live Stats */}
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{viewerCount} watching now</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{demoStats.totalViews.toLocaleString()} total views</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{demoStats.completionRate}% completion rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {demos.map((demo) => (
              <Card 
                key={demo.id}
                className={`cursor-pointer transition-all duration-300 hover:glow-primary ${
                  activeDemo === demo.id ? 'ring-2 ring-primary card-gradient' : 'card-gradient border-border'
                }`}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeDemo === demo.id ? 'bg-primary' : 'bg-muted'
                    }`}>
                      <demo.icon className={`w-5 h-5 ${
                        activeDemo === demo.id ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{demo.title}</h3>
                      <Badge variant="outline" className="text-xs">{demo.duration}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{demo.description}</p>
                  <div className="space-y-1">
                    {demo.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Demo Player */}
      <section className="section-padding">
        <div className="container-width max-w-6xl mx-auto">
          <Card className="card-gradient border-border glow-primary">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <activeDemo_data.icon className="w-6 h-6 text-primary" />
                  <span>{activeDemo_data.title} Demo</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Video Player Mockup */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden mb-6">
                <div className="aspect-video flex items-center justify-center relative">
                  {/* Simulated Video Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse"></div>
                  
                  {/* Demo Visualization */}
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <activeDemo_data.icon className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{activeDemo_data.title}</h3>
                    <p className="text-white/80 mb-6">{activeDemo_data.description}</p>
                    
                    {/* Real-time Demo Stats */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary animate-pulse">
                          {Math.floor(currentTime * 1.5)}
                        </div>
                        <div className="text-xs text-white/60">Tasks Automated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary animate-pulse">
                          {Math.floor(currentTime * 0.8)}%
                        </div>
                        <div className="text-xs text-white/60">Efficiency Gained</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary animate-pulse">
                          ${Math.floor(currentTime * 125)}
                        </div>
                        <div className="text-xs text-white/60">Cost Saved</div>
                      </div>
                    </div>
                  </div>

                  {/* Play/Pause Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button 
                        onClick={handlePlay}
                        className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90"
                      >
                        <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={handlePlay}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button onClick={handleRestart} size="sm" variant="outline">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentTime}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white text-sm">{activeDemo_data.duration}</span>
                    <Button size="sm" variant="outline">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Demo Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeDemo_data.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-muted/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <Card className="card-gradient border-border glow-primary">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Build This for Your Business?</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Transform your operations with the same AI technology you just saw in action.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold">Quick Setup</div>
                    <div className="text-sm text-muted-foreground">2-week implementation</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold">Immediate Impact</div>
                    <div className="text-sm text-muted-foreground">See results from day one</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-semibold">Expert Support</div>
                    <div className="text-sm text-muted-foreground">Dedicated implementation team</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-primary text-lg px-8 py-3">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button className="btn-ghost text-lg px-8 py-3">
                    Schedule Personal Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WatchDemo;