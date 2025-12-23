import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  PiggyBank,
  Bell
} from "lucide-react";

export default function Home() {
  const { profile, user } = useAuth();

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const greeting = getGreeting();

  return (
    <AppLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <p className="text-muted-foreground text-sm">{greeting}</p>
            <h1 className="text-2xl font-bold text-foreground">
              {displayName} 👋
            </h1>
          </div>
          <button className="relative p-3 rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </button>
        </div>

        {/* Balance Card */}
        <AnimatedCard 
          delay={100}
          className="gradient-primary text-primary-foreground border-0 mb-6"
          hover={false}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-primary-foreground/80 text-sm">Total Balance</span>
            <Wallet className="h-5 w-5 text-primary-foreground/80" />
          </div>
          <h2 className="text-4xl font-bold mb-1">$24,562.00</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 bg-primary-foreground/20 rounded-full px-2 py-0.5">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
            <span className="text-primary-foreground/80">vs last month</span>
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: ArrowUpRight, label: "Send", color: "gradient-primary" },
            { icon: ArrowDownLeft, label: "Receive", color: "gradient-success" },
            { icon: CreditCard, label: "Cards", color: "gradient-accent" },
            { icon: PiggyBank, label: "Save", color: "bg-warning" },
          ].map(({ icon: Icon, label, color }, i) => (
            <AnimatedCard
              key={label}
              delay={200 + i * 50}
              className="flex flex-col items-center p-4"
            >
              <div className={`${color} p-3 rounded-xl mb-2`}>
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-foreground">{label}</span>
            </AnimatedCard>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="mb-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <button className="text-sm text-primary font-medium">See all</button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <AnimatedCard
                key={tx.id}
                delay={500 + i * 75}
                className="flex items-center gap-4 p-4"
              >
                <div className={`p-3 rounded-xl ${tx.type === "income" ? "bg-success/10" : "bg-destructive/10"}`}>
                  {tx.type === "income" ? (
                    <ArrowDownLeft className={`h-5 w-5 ${tx.type === "income" ? "text-success" : "text-destructive"}`} />
                  ) : (
                    <ArrowUpRight className={`h-5 w-5 ${tx.type === "income" ? "text-success" : "text-destructive"}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{tx.title}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
                <p className={`font-semibold ${tx.type === "income" ? "text-success" : "text-foreground"}`}>
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const transactions = [
  { id: 1, title: "Salary Deposit", amount: "3,500.00", date: "Today, 10:30 AM", type: "income" },
  { id: 2, title: "Netflix Subscription", amount: "15.99", date: "Yesterday", type: "expense" },
  { id: 3, title: "Coffee Shop", amount: "4.50", date: "Yesterday", type: "expense" },
  { id: 4, title: "Freelance Payment", amount: "850.00", date: "Dec 20", type: "income" },
];