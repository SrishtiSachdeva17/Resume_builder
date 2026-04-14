'use client'

import { Resume } from '@/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Download, Share2, Copy } from 'lucide-react'
import { useState } from 'react'

interface ExportActionsProps {
  resume: Resume
}

export function ExportActions({ resume }: ExportActionsProps) {
  const [copied, setCopied] = useState(false)

  const generatePDFContent = () => {
    // This would typically use a library like pdfkit or html2pdf
    // For now, we'll prepare data that a backend service can convert to PDF
    return {
      title: resume.title,
      personalInfo: resume.personalInfo,
      education: resume.education,
      experience: resume.experience,
      skills: resume.skills,
    }
  }

  const handlePDFExport = async () => {
    try {
      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatePDFContent()),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resume.title.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('[v0] PDF export failed:', error)
    }
  }

  const handleCopyAsText = () => {
    const text = `
${resume.personalInfo.fullName}
${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}

PROFESSIONAL SUMMARY
${resume.personalInfo.summary}

WORK EXPERIENCE
${resume.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${resume.education.map(edu => `
${edu.degree} in ${edu.field}
${edu.school}
${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}
`).join('\n')}

SKILLS
${Object.entries(
  resume.skills.reduce((acc, skill) => {
    const category = skill.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill.name)
    return acc
  }, {} as Record<string, string[]>)
)
  .map(([category, skills]) => `${category}: ${skills.join(', ')}`)
  .join('\n')}
    `.trim()

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handlePDFExport}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        Export PDF
      </Button>
      <Button
        onClick={handleCopyAsText}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Copy className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy as Text'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => {
          // Share functionality would go here
          alert('Share link will be available in the dashboard')
        }}
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  )
}
