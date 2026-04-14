'use client'

import { Resume } from '@/context/ResumeContext'

interface ResumePreviewProps {
  resume: Resume | null
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  if (!resume) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Create or select a resume to preview
      </div>
    )
  }

  return (
    <div className="bg-white text-black p-8 h-full overflow-y-auto font-sans">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl font-bold">{resume.personalInfo.fullName}</h1>
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 uppercase text-gray-800">Professional Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase text-gray-800">Work Experience</h2>
          <div className="space-y-4">
            {resume.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase text-gray-800">Education</h2>
          <div className="space-y-3">
            {resume.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3 uppercase text-gray-800">Skills</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(
              resume.skills.reduce((acc, skill) => {
                const category = skill.category || 'General'
                if (!acc[category]) {
                  acc[category] = []
                }
                acc[category].push(skill)
                return acc
              }, {} as Record<string, typeof resume.skills>)
            ).map(([category, skills]) => (
              <div key={category}>
                <p className="font-bold text-gray-800 mb-1 text-sm">{category}</p>
                <p className="text-sm text-gray-700">{skills.map(s => s.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
