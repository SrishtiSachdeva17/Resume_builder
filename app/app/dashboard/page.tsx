'use client'

import { useAuth } from '@/context/AuthContext'
import { useResume } from '@/context/ResumeContext'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Plus, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { createResume } = useResume()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleNewResume = () => {
    createResume('My Resume')
    router.push('/app/editor')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">ResumeBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Resumes</h1>
          <p className="text-muted-foreground">Create and manage your professional resumes</p>
        </div>

        {/* New Resume Button */}
        <Button onClick={handleNewResume} className="gap-2 mb-12">
          <Plus className="w-5 h-5" />
          Create New Resume
        </Button>

        {/* Empty State */}
        <div className="text-center py-20 bg-secondary/20 rounded-lg border border-border">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No resumes yet</h2>
          <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
          <Button onClick={handleNewResume}>Create Resume</Button>
        </div>
      </div>
    </main>
  )
}
