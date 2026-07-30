"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  Utensils,
  ShoppingCart,
  Wallet,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Calculator,
  ClipboardCheck,
  ChevronDown,
  Receipt,
  PiggyBank,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function useCounter(target: number, duration = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 50 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
      const unsubscribe = springValue.on("change", (v) => setValue(Math.round(v)));
      return unsubscribe;
    }
  }, [inView, target, motionValue, springValue]);

  return { ref, value, inView };
}

function FloatingOrb({ size, color, top, left, right, delay }: { size: number; color: string; top: string; left?: string; right?: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, top, left, right, background: color }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 20, -10, 10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.15, 0.25, 0.15, 0.2, 0.15],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

const stats = [
  { value: 50000, suffix: "+", label: "Meals Tracked", icon: Utensils, color: "emerald" },
  { value: 12000, suffix: "+", label: "Bazaars Logged", icon: ShoppingCart, color: "blue" },
  { value: 25000, suffix: "+", label: "Expenses Managed", icon: Receipt, color: "orange" },
  { value: 98, suffix: "%", label: "Billing Accuracy", icon: ClipboardCheck, color: "purple" },
];

const features = [
  {
    icon: Calculator,
    title: "Auto Meal Rate",
    description: "Daily meal rate auto-calculated from total bazaar cost divided by total meals. No math needed.",
    color: "emerald",
    size: "lg",
    stat: "Real-time calculation",
  },
  {
    icon: Utensils,
    title: "Meal Tracking",
    description: "Log breakfast, lunch, dinner for any member. Edit or remove with one click.",
    color: "blue",
    size: "sm",
    stat: "Per-member logs",
  },
  {
    icon: ShoppingCart,
    title: "Bazaar Ledger",
    description: "Transparent record of every purchase — who bought it, what it cost, and when.",
    color: "orange",
    size: "sm",
    stat: "Full audit trail",
  },
  {
    icon: PiggyBank,
    title: "Deposits & Dues",
    description: "Track advance payments, personal balances, and who owes what at a glance.",
    color: "violet",
    size: "sm",
    stat: "Auto balance calc",
  },
  {
    icon: TrendingUp,
    title: "Smart Analytics",
    description: "Visual charts for meal trends, expense breakdown, and monthly comparisons.",
    color: "rose",
    size: "sm",
    stat: "Insightful charts",
  },
  {
    icon: ShieldCheck,
    title: "Role Management",
    description: "Assign Manager or Member roles. Managers control settings, members view their data.",
    color: "cyan",
    size: "sm",
    stat: "RBAC controls",
  },
];

function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[200px]" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <FloatingOrb size={300} color="radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)" top="15%" left="10%" delay={0} />
      <FloatingOrb size={200} color="radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)" top="60%" right="15%" left="auto" delay={2} />
      <FloatingOrb size={250} color="radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)" top="40%" left="60%" delay={4} />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-50 max-w-7xl mx-auto px-6 py-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-emerald-500/15 rounded-xl ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/25 group-hover:ring-emerald-500/30 transition-all duration-300">
            <Utensils className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Mess</span>
            <span className="text-emerald-400">Mate</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">How it Works</Link>
          <div className="flex items-center gap-3 ml-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-xl text-sm px-5">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 rounded-xl text-sm px-5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-zinc-400 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-3">
            <Link href="#features" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-zinc-200 py-2">Features</Link>
            <Link href="#how-it-works" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-zinc-200 py-2">How it Works</Link>
            <div className="flex gap-3 pt-2 border-t border-zinc-800">
              <Link href="/login" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full border-zinc-700 rounded-xl">Sign In</Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-xl">Get Started</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col">
      <AnimatedMeshBackground />

      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 pb-20">
        <motion.div style={{ y, opacity }} className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-8 group hover:bg-white/[0.06] transition-colors cursor-default"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-sm font-medium text-zinc-300">
              The Ultimate Mess Management System
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            <span className="text-white">Run your mess with</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400">
              zero spreadsheet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Track meals, manage bazaar expenses, auto-calculate bills, and keep transparent records for every member — all in one beautiful dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="group relative h-14 px-8 rounded-full text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start for free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full text-base border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800/80 hover:text-white transition-all duration-300"
              >
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-zinc-800/50">
        {stats.map((stat, idx) => {
          const { ref, value, inView } = useCounter(stat.value);
          const Icon = stat.icon;
          const colorMap: Record<string, string> = {
            emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
            blue: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20",
            orange: "from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/20",
            purple: "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/20",
          };

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-zinc-900/80 backdrop-blur-sm p-8 text-center group hover:bg-zinc-900 transition-colors"
            >
              <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${colorMap[stat.color]} border mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <div ref={ref} className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums">
                {inView ? value.toLocaleString() : 0}{stat.suffix}
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
            <span className="text-sm font-medium text-zinc-300">Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">run a mess</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            No more spreadsheets or messy notebooks. MessMate digitizes every aspect of your shared living expenses.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          const colorMap: Record<string, string> = {
            emerald: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:shadow-emerald-500/10",
            blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-blue-500/10",
            orange: "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 group-hover:shadow-orange-500/10",
            violet: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 group-hover:shadow-violet-500/10",
            rose: "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:shadow-rose-500/10",
            cyan: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:shadow-cyan-500/10",
          };
          const isLarge = feature.size === "lg";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative p-6 md:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 hover:bg-zinc-900/50 hover:border-zinc-700/60 transition-all duration-500 ${isLarge ? "md:col-span-2" : ""}`}
            >
              <div className={`w-11 h-11 rounded-xl ${colorMap[feature.color]} flex items-center justify-center mb-4 transition-all duration-300 shadow-lg`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400/80">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {feature.stat}
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-emerald-500/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { icon: ClipboardCheck, title: "Create an Account", desc: "Sign up and create a new Mess workspace in under 30 seconds. No credit card needed." },
    { icon: Users, title: "Invite Your Members", desc: "Send invites to your roommates. Each member gets their own dashboard with personal stats." },
    { icon: BarChart3, title: "Log Meals & Bazaars", desc: "Input daily meals and market purchases. MessMate auto-calculates everything in real-time." },
  ];

  return (
    <section id="how-it-works" className="relative max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
            <span className="text-sm font-medium text-zinc-300">Simple Workflow</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Setup in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">seconds</span>
          </h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-md">
            We&apos;ve designed the workflow to be as frictionless as possible. Get your entire mess onboarded today.
          </p>

          <div className="space-y-8">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex gap-5 group"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all duration-300">
                      <StepIcon className="w-5 h-5 text-emerald-400" />
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-emerald-500/30 to-transparent min-h-[24px] mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-zinc-500">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/10 blur-3xl rounded-full" />
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <div className="ml-auto text-[10px] text-zinc-600 font-mono">MessMate Dashboard</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Today&apos;s Meal Rate</div>
                    <div className="text-xs text-zinc-500">Auto-calculated</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-400">৳ 85.50</div>
                  <div className="text-[10px] text-zinc-600">per meal</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                  <div className="text-xs text-zinc-500 mb-1">Total Meals</div>
                  <div className="text-xl font-bold text-white">247</div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "73%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
                  <div className="text-xs text-zinc-500 mb-1">Total Bazaar</div>
                  <div className="text-xl font-bold text-white">৳ 21,120</div>
                  <div className="w-full h-1.5 rounded-full bg-zinc-800 mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "58%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-zinc-400">Final Bill Calculation</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-sm font-bold text-emerald-400">Auto-balanced</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-zinc-900 to-teal-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 px-8 py-16 md:px-20 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ready to simplify your mess?
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
            Join MessMate today and never worry about miscalculated bills or lost receipts again.
          </p>
          <Link href="/register">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="h-14 px-10 rounded-full text-base font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
              >
                Create Your Account Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </Link>
        </div>

        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/10 rounded-full blur-[80px]" />
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-900/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-500/10 rounded-lg">
              <Utensils className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="font-bold text-zinc-300">
              <span className="text-white">Mess</span>
              <span className="text-emerald-400">Mate</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#features" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">How it Works</Link>
            <Link href="/login" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Sign In</Link>
            <Link href="/register" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Register</Link>
          </div>

          <div className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} MessMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
