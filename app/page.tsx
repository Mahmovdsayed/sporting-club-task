"use client"

import Link from "next/link"
import { Activity, Users, Zap, ArrowRight, Trophy } from "lucide-react"

const page = () => {
  const features = [
    {
      icon: Activity,
      title: "Manage Sports",
      description: "Add, organize, and manage all your club's sports in one centralized location.",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Keep track of all club members with their contact information and details.",
    },
    {
      icon: Zap,
      title: "Subscriptions",
      description: "Easily subscribe members to multiple sports and manage their participation.",
    },
    {
      icon: Trophy,
      title: "Track Performance",
      description: "Monitor member engagement and subscription statistics at a glance.",
    },
  ]

  return (
    <div className="min-h-screen">
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Sports Club</h1>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Manage Your Sports Club with Ease
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            A comprehensive management system designed to streamline your club operations, from member management to
            sport subscriptions.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-card border-t border-border py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</p>
              <p className="text-muted-foreground">Organized Management</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">Real-time</p>
              <p className="text-muted-foreground">Data Updates</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">Easy</p>
              <p className="text-muted-foreground">To Use Interface</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start managing your sports club efficiently today. Access all features with our intuitive dashboard.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
        >
          Enter Dashboard
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Sports Club Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default page