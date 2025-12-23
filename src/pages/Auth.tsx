import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { GradientButton } from "@/components/ui/GradientButton";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Mail, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors: typeof errors = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }
    
    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Please enter your name";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login failed",
            description: error.message === "Invalid login credentials" 
              ? "Invalid email or password. Please try again."
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          const message = error.message.includes("already registered")
            ? "An account with this email already exists. Please log in instead."
            : error.message;
          toast({
            title: "Sign up failed",
            description: message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account created!",
            description: "Welcome to FinApp. Let's get started!",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background safe-top safe-bottom">
      {/* Header with gradient */}
      <div className="gradient-primary px-6 pt-12 pb-16 rounded-b-[2.5rem]">
        <div className="flex items-center justify-center mb-4 animate-fade-in">
          <div className="p-3 rounded-2xl bg-primary-foreground/20 backdrop-blur-xl">
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground text-center animate-fade-in">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-primary-foreground/80 text-center mt-2 animate-fade-in">
          {isLogin ? "Sign in to continue" : "Start your financial journey"}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 -mt-8">
        <div className="bg-card rounded-2xl shadow-xl p-6 animate-slide-up">
          {/* Toggle tabs */}
          <div className="flex gap-2 p-1 rounded-xl bg-secondary mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all",
                isLogin
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all",
                !isLogin
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 pl-12 rounded-xl"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-12 rounded-xl"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <PasswordInput
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {isLogin && (
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            )}

            <GradientButton
              type="submit"
              loading={loading}
              className="w-full mt-6"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
}