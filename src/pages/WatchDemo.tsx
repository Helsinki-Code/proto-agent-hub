import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, toast]);

  const demos = [
    {
      id: "workflow",
      title: "Workflow Automation",
      description: "See how AI agents automate complex business processes",
      duration: "8 min",
      viewers: "2.1K",
      icon: Settings
    },
    {
      id: "support",
      title: "Customer Support AI",
      description: "24/7 intelligent customer service automation",
      duration: "6 min", 
      viewers: "3.7K",
      icon: MessageSquare
    },
    {
      id: "analytics",
      title: "Data Analysis",
      description: "Automated insights and predictive analytics",
      duration: "10 min",
      viewers: "1.8K", 
      icon: BarChart3
    },
    {
      id: "optimization",
      title: "Process Optimization", 
      description: "AI-driven efficiency improvements",
      duration: "7 min",
      viewers: "2.4K",
      icon: Target
    }
  ];

  const features = [
    "Real-time process automation",
    "Intelligent decision making", 
    "Seamless integrations",
    "24/7 monitoring",
    "Scalable architecture",
    "Enterprise security"
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentTime >= 100) {
      setCurrentTime(0);
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleGetStarted = () => {
    navigate("/get-started");
  };

  const handleScheduleDemo = () => {
    navigate("/schedule-demo");
  };

  const formatTime = (percentage: number) => {
    const totalSeconds = Math.floor((percentage / 100) * 480); // 8 minutes max
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary">
              Live Interactive Demo
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              See Agentic AI <span className="text-gradient">In Action</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the power of intelligent automation through our interactive demos. 
              Watch real AI agents solve actual business challenges.
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
                    <Badge variant="outline">{demo.duration}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{demo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{demo.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{demo.viewers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Video Player */}
          <Card className="card-gradient border-border mb-8">
            <CardContent className="p-0">
              <div className="relative bg-black rounded-t-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-primary-foreground" />
                    ) : (
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {demos.find(d => d.id === activeDemo)?.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {demos.find(d => d.id === activeDemo)?.description}
                  </p>
                  <div className="text-sm text-gray-400">
                    {formatTime(currentTime)} / {demos.find(d => d.id === activeDemo)?.duration}
                  </div>
                </div>
                
                {/* Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <div className="w-full bg-gray-700 rounded-full h-1 mb-3">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${currentTime}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="p-6 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button 
                      size="sm" 
                      onClick={handlePlayPause}
                      className="btn-primary"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Live</span>
                    </div>
                    <span>Quality: HD</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <Card className="card-gradient border-border">
            <CardHeader>
              <CardTitle>What You'll See in This Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/20">
        <div className="container-width">
          <Card className="card-gradient border-border glow-primary">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Implement This?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your business with the same AI agents you just saw in action. 
                Our team can have you up and running in just 2 weeks.
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
                <Button 
                  className="btn-primary text-lg px-8 py-3"
                  onClick={handleGetStarted}
                >
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  className="btn-ghost text-lg px-8 py-3"
                  onClick={handleScheduleDemo}
                >
                  Schedule Personal Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default WatchDemo;