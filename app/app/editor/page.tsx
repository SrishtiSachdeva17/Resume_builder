'use client'

import { useState } from 'react'
import { useResume } from '@/context/ResumeContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileText, Save, ChevronLeft } from 'lucide-react'
import { PersonalInfoForm } from '@/components/PersonalInfoForm'
import { EducationForm, ExperienceForm } from '@/components/EducationExperienceForms'
import { SkillsForm } from '@/components/SkillsForm'
import { ResumePreview } from '@/components/ResumePreview'
import { ExportActions } from '@/components/ExportActions'

type FormTab = 'personal' | 'education' | 'experience' | 'skills'

export default function EditorPage() {
  const { resume, saveResume } = useResume()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<FormTab>('personal')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveResume()
      // Show success feedback
    } catch (error) {
      console.error('[v0] Error saving resume:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No resume loaded</p>
          <Button onClick={() => router.push('/app/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/app/dashboard')} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-semibold">{resume.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ExportActions resume={resume} />
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Resume'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Panel - Forms */}
        <div className="w-1/2 border-r border-border overflow-y-auto p-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 sticky top-0 bg-background py-2 -mx-6 px-6 border-b border-border">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'personal'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'skills'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Skills
            </button>
          </div>

          {/* Form Content */}
          <div className="space-y-8">
            {activeTab === 'personal' && <PersonalInfoForm initialData={resume.personalInfo} />}
            {activeTab === 'education' && <EducationForm initialEducation={resume.education} />}
            {activeTab === 'experience' && <ExperienceForm initialExperience={resume.experience} />}
            {activeTab === 'skills' && <SkillsForm initialSkills={resume.skills} />}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-secondary/30 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Preview</h3>
            <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
