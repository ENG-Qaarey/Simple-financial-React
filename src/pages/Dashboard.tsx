import { AppLayout } from "@/components/layout/AppLayout";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your financial overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, i) => (
            <AnimatedCard key={stat.label} delay={100 + i * 75} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
                </div>
                <span className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend > 0 ? "text-success" : "text-destructive"
                )}>
                  {stat.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(stat.trend)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </AnimatedCard>
          ))}
        </div>

        {/* Monthly Overview */}
        <AnimatedCard delay={400} className="mb-6" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Monthly Overview</h3>
            <button className="text-sm text-primary font-medium">Details</button>
          </div>
          
          {/* Simple Chart Bars */}
          <div className="flex items-end justify-between gap-2 h-32 mb-4">
            {chartData.map((item, i) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-full rounded-t-md transition-all duration-500",
                    i === chartData.length - 1 ? "gradient-primary" : "bg-secondary"
                  )}
                  style={{ 
                    height: `${item.value}%`,
                    animationDelay: `${600 + i * 100}ms`
                  }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Spending</span>
            <span className="font-semibold text-foreground">$4,280.00</span>
          </div>
        </AnimatedCard>

        {/* Goals */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <h3 className="text-lg font-semibold text-foreground">Savings Goals</h3>
            <button className="text-sm text-primary font-medium flex items-center gap-1">
              Add Goal <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {goals.map((goal, i) => (
              <AnimatedCard key={goal.title} delay={700 + i * 75} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-xl", goal.bgColor)}>
                    <goal.icon className={cn("h-5 w-5", goal.iconColor)} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground">{goal.title}</p>
                      <span className="text-sm font-semibold text-foreground">{goal.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full gradient-primary rounded-full transition-all duration-1000"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const stats = [
  { label: "Income", value: "$12,450", icon: TrendingUp, trend: 8.2, bgColor: "bg-success/10", iconColor: "text-success" },
  { label: "Expenses", value: "$4,280", icon: TrendingDown, trend: -3.1, bgColor: "bg-destructive/10", iconColor: "text-destructive" },
  { label: "Savings", value: "$8,170", icon: DollarSign, trend: 12.5, bgColor: "bg-primary/10", iconColor: "text-primary" },
  { label: "Investments", value: "$15,320", icon: BarChart3, trend: 5.7, bgColor: "bg-accent/10", iconColor: "text-accent" },
];

const chartData = [
  { month: "Jul", value: 60 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 75 },
  { month: "Oct", value: 55 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 65 },
];

const goals = [
  { title: "Emergency Fund", current: 8500, target: 10000, progress: 85, icon: Target, bgColor: "bg-success/10", iconColor: "text-success" },
  { title: "New Car", current: 12000, target: 35000, progress: 34, icon: Target, bgColor: "bg-primary/10", iconColor: "text-primary" },
  { title: "Vacation", current: 2200, target: 5000, progress: 44, icon: Target, bgColor: "bg-accent/10", iconColor: "text-accent" },
];