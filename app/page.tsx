'use client'

import Link from 'next/link'
import { ArrowRight, Zap, FileText, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">ResumeBuilder</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm mb-6">
          <Zap className="w-4 h-4" />
          <span>AI-Powered Resume Building</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Build Your Perfect Resume with AI
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
          Create a professional resume in minutes. Our AI helps you write compelling content, optimize formatting, and export to PDF. Land your dream job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Start Building Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Hero Image Placeholder */}
        <div className="w-full max-w-3xl aspect-video rounded-lg bg-secondary/50 border border-border flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Resume Editor Preview</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to create a standout resume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
              <p className="text-muted-foreground">Let AI enhance your bullet points and summaries for maximum impact</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-muted-foreground">Choose from beautifully designed templates optimized for ATS</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
              <p className="text-muted-foreground">Download as PDF or share directly with employers</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Resume?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs using ResumeBuilder.
          </p>
          <Link href="/signup">
            <Button size="lg">Start Building Today</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 ResumeBuilder. All rights reserved.</p>
      </footer>
    </main>
  )
}
