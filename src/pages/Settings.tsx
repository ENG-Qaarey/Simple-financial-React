import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GradientButton } from "@/components/ui/GradientButton";
import { 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut,
  ChevronRight,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <AppLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>

        {/* Appearance */}
        <AnimatedCard delay={100} className="mb-4" hover={false}>
          <h3 className="font-semibold text-foreground mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ThemeToggle className="w-full justify-center" />
          </div>
        </AnimatedCard>

        {/* Settings List */}
        <div className="space-y-3 mb-6">
          {settingsItems.map((item, i) => (
            <AnimatedCard key={item.title} delay={200 + i * 50}>
              <button className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", item.bgColor)}>
                    <item.icon className={cn("h-5 w-5", item.iconColor)} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </AnimatedCard>
          ))}
        </div>

        {/* Sign Out */}
        <AnimatedCard delay={500} hover={false}>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 text-destructive"
          >
            <div className="p-2 rounded-lg bg-destructive/10">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </AnimatedCard>

        {/* Version */}
        <p className="text-center text-sm text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: "600ms" }}>
          Version 1.0.0
        </p>
      </div>
    </AppLayout>
  );
}

const settingsItems = [
  { 
    title: "Notifications", 
    description: "Manage your alerts", 
    icon: Bell, 
    bgColor: "bg-primary/10", 
    iconColor: "text-primary" 
  },
  { 
    title: "Security", 
    description: "Password & authentication", 
    icon: Shield, 
    bgColor: "bg-success/10", 
    iconColor: "text-success" 
  },
  { 
    title: "Help & Support", 
    description: "Get help with your account", 
    icon: HelpCircle, 
    bgColor: "bg-accent/10", 
    iconColor: "text-accent" 
  },
  { 
    title: "Terms & Privacy", 
    description: "Legal information", 
    icon: FileText, 
    bgColor: "bg-warning/10", 
    iconColor: "text-warning" 
  },
];