import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Camera,
  Edit2,
  Check,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { profile, user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await updateProfile({ full_name: fullName });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    }
    setLoading(false);
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <AppLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow">
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-card shadow-lg border border-border">
              <Camera className="h-4 w-4 text-foreground" />
            </button>
          </div>
          <h1 className="text-2xl font-bold text-foreground">{displayName}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        {/* Profile Info */}
        <AnimatedCard delay={100} className="mb-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Personal Information</h3>
            {!isEditing ? (
              <button 
                onClick={() => {
                  setFullName(profile?.full_name || "");
                  setIsEditing(true);
                }}
                className="p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  className="p-2 rounded-lg gradient-primary text-primary-foreground"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              {isEditing ? (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 pl-11 rounded-xl"
                    placeholder="Enter your name"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{displayName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{user?.email}</span>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Account Stats */}
        <div className="grid grid-cols-3 gap-3">
          {accountStats.map((stat, i) => (
            <AnimatedCard key={stat.label} delay={200 + i * 75} className="text-center p-4">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const accountStats = [
  { label: "Transactions", value: "142" },
  { label: "Cards", value: "3" },
  { label: "Goals", value: "5" },
];