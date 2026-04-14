'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Skill {
  id: string
  name: string
  category: string
}

export interface Resume {
  id: string
  title: string
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  createdAt: string
  updatedAt: string
}

interface ResumeContextType {
  resume: Resume | null
  resumes: Resume[]
  createResume: (title: string) => void
  updatePersonalInfo: (info: PersonalInfo) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Education) => void
  deleteEducation: (id: string) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Experience) => void
  deleteExperience: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Skill) => void
  deleteSkill: (id: string) => void
  loadResume: (id: string) => void
  saveResume: () => Promise<void>
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [resumes, setResumes] = useState<Resume[]>([])

  const createResume = useCallback((title: string) => {
    const newResume: Resume = {
      id: Date.now().toString(),
      title,
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
      },
      education: [],
      experience: [],
      skills: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setResume(newResume)
  }, [])

  const updatePersonalInfo = useCallback((info: PersonalInfo) => {
    if (resume) {
      setResume({
        ...resume,
        personalInfo: info,
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const addEducation = useCallback((education: Education) => {
    if (resume) {
      setResume({
        ...resume,
        education: [...resume.education, education],
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const updateEducation = useCallback((id: string, education: Education) => {
    if (resume) {
      setResume({
        ...resume,
        education: resume.education.map(e => (e.id === id ? education : e)),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const deleteEducation = useCallback((id: string) => {
    if (resume) {
      setResume({
        ...resume,
        education: resume.education.filter(e => e.id !== id),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const addExperience = useCallback((experience: Experience) => {
    if (resume) {
      setResume({
        ...resume,
        experience: [...resume.experience, experience],
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const updateExperience = useCallback((id: string, experience: Experience) => {
    if (resume) {
      setResume({
        ...resume,
        experience: resume.experience.map(e => (e.id === id ? experience : e)),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const deleteExperience = useCallback((id: string) => {
    if (resume) {
      setResume({
        ...resume,
        experience: resume.experience.filter(e => e.id !== id),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const addSkill = useCallback((skill: Skill) => {
    if (resume) {
      setResume({
        ...resume,
        skills: [...resume.skills, skill],
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const updateSkill = useCallback((id: string, skill: Skill) => {
    if (resume) {
      setResume({
        ...resume,
        skills: resume.skills.map(s => (s.id === id ? skill : s)),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const deleteSkill = useCallback((id: string) => {
    if (resume) {
      setResume({
        ...resume,
        skills: resume.skills.filter(s => s.id !== id),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [resume])

  const loadResume = useCallback((id: string) => {
    // In a real app, this would fetch from the API
    const resumeToLoad = resumes.find(r => r.id === id)
    if (resumeToLoad) {
      setResume(resumeToLoad)
    }
  }, [resumes])

  const saveResume = useCallback(async () => {
    if (!resume) return

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resume),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to save resume')
      }

      const data = await response.json()
      setResume(data)
    } catch (error) {
      console.error('[v0] Failed to save resume:', error)
      throw error
    }
  }, [resume])

  const value: ResumeContextType = {
    resume,
    resumes,
    createResume,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    addSkill,
    updateSkill,
    deleteSkill,
    loadResume,
    saveResume,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within ResumeProvider')
  }
  return context
}
