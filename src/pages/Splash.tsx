import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && animationComplete) {
      if (user) {
        navigate("/home", { replace: true });
      } else {
        navigate("/auth", { replace: true });
      }
    }
  }, [user, loading, animationComplete, navigate]);

  return (
    <div className="fixed inset-0 gradient-primary flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary-foreground/20 backdrop-blur-xl mb-6 animate-pulse-glow">
          <Wallet className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-primary-foreground mb-2">
          FinApp
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          Your Financial Future
        </p>
        
        {/* Loading indicator */}
        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}