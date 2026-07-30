"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Utensils, 
  ShoppingCart, 
  Wallet, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Fade up animation variant
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Utensils className="w-6 h-6 text-emerald-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-100">MessMate</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pb-24">
        
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300">The Ultimate Mess Management System</span>
          </motion.div>
          
          <motion.h1 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Manage your mess <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              effortlessly and smartly.
            </span>
          </motion.h1>
          
          <motion.p 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Track meals, manage bazaar expenses, calculate auto-bills, and keep transparent records for every member. All in one beautiful dashboard.
          </motion.p>
          
          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariant}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white h-14 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300">
                Start for free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-lg border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white transition-all duration-300">
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Everything you need to run a mess</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">No more spreadsheets or messy notebooks. MessMate digitizes every aspect of your shared living expenses.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-100">Automated Meal Rates</h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                We automatically calculate your daily meal rate based on total bazaar expenses and total meals consumed. Always know exactly where you stand.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Meal Tracking</h3>
              <p className="text-zinc-400">Add, edit, or remove daily meals for any member with just a few clicks.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Bazaar Expenses</h3>
              <p className="text-zinc-400">Keep a transparent log of who bought what, and how much it cost the mess.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Deposit Management</h3>
              <p className="text-zinc-400">Track advance payments and personal balances seamlessly.</p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl hover:bg-zinc-900/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-100">Member Roles</h3>
              <p className="text-zinc-400">Assign Manager or Member roles to distribute responsibilities.</p>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Setup in seconds</h2>
              <p className="text-zinc-400 text-lg mb-8">We've designed the workflow to be as frictionless as possible. Get your entire mess onboarded today.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Create an Account", desc: "Sign up and create a new Mess workspace instantly." },
                  { title: "Invite Members", desc: "Add your roommates to the mess so they can view their own stats." },
                  { title: "Log Data & Relax", desc: "Input daily meals and bazaars. We handle all the math." }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-zinc-200 mb-1">{step.title}</h4>
                      <p className="text-zinc-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent blur-3xl rounded-full" />
              <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl">
                {/* Mockup UI */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                  <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-emerald-500/20 rounded-full" />
                </div>
                <div className="space-y-3">
                  <div className="h-24 w-full bg-zinc-800/50 rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-zinc-800/50 rounded-xl" />
                    <div className="h-20 bg-zinc-800/50 rounded-xl" />
                  </div>
                  <div className="h-12 w-full bg-emerald-500/20 border border-emerald-500/30 rounded-xl mt-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-zinc-900/0 to-zinc-900/0 pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 relative z-10">Ready to simplify your mess?</h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 relative z-10">
              Join MessMate today and never worry about miscalculated bills or lost receipts again.
            </p>
            <Link href="/register" className="relative z-10">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white h-14 px-10 rounded-full text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all duration-300">
                Create Your Account Now
              </Button>
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 py-12 text-center text-zinc-500">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Utensils className="w-5 h-5" />
          <span className="font-bold text-zinc-300">MessMate</span>
        </div>
        <p>© {new Date().getFullYear()} MessMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
