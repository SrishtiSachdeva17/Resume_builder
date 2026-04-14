'use client'

import { useState } from 'react'
import { useResume, Education, Experience } from '@/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Plus } from 'lucide-react'
import { AIEnhancer } from './AIEnhancer'

interface EducationFormProps {
  initialEducation?: Education[]
}

export function EducationForm({ initialEducation = [] }: EducationFormProps) {
  const { addEducation, updateEducation, deleteEducation } = useResume()
  const [education, setEducation] = useState<Education[]>(initialEducation)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newEntry, setNewEntry] = useState<Partial<Education>>({})

  const handleAddEducation = () => {
    const id = Date.now().toString()
    const entry: Education = {
      id,
      school: newEntry.school || '',
      degree: newEntry.degree || '',
      field: newEntry.field || '',
      startDate: newEntry.startDate || '',
      endDate: newEntry.endDate || '',
      current: newEntry.current || false,
    }
    setEducation([...education, entry])
    addEducation(entry)
    setNewEntry({})
  }

  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter(e => e.id !== id))
    deleteEducation(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button size="sm" variant="outline" onClick={handleAddEducation} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map(entry => (
          <div key={entry.id} className="p-4 border border-border rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold">{entry.school}</h4>
                <p className="text-sm text-muted-foreground">{entry.degree} in {entry.field}</p>
              </div>
              <button onClick={() => handleDeleteEducation(entry.id)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {entry.startDate} - {entry.current ? 'Present' : entry.endDate}
            </p>
          </div>
        ))}
      </div>

      {/* Add Education Form */}
      <div className="p-4 border border-dashed border-border rounded-lg space-y-3">
        <Input
          placeholder="School or University"
          value={newEntry.school || ''}
          onChange={(e) => setNewEntry({ ...newEntry, school: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Degree (e.g., Bachelor of Science)"
            value={newEntry.degree || ''}
            onChange={(e) => setNewEntry({ ...newEntry, degree: e.target.value })}
          />
          <Input
            placeholder="Field of Study"
            value={newEntry.field || ''}
            onChange={(e) => setNewEntry({ ...newEntry, field: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Start Date"
            value={newEntry.startDate || ''}
            onChange={(e) => setNewEntry({ ...newEntry, startDate: e.target.value })}
          />
          <Input
            placeholder="End Date"
            value={newEntry.endDate || ''}
            onChange={(e) => setNewEntry({ ...newEntry, endDate: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newEntry.current || false}
            onChange={(e) => setNewEntry({ ...newEntry, current: e.target.checked })}
          />
          <span className="text-sm">Currently studying here</span>
        </label>
        <Button size="sm" onClick={handleAddEducation} className="w-full">Add Entry</Button>
      </div>
    </div>
  )
}

interface ExperienceFormProps {
  initialExperience?: Experience[]
}

export function ExperienceForm({ initialExperience = [] }: ExperienceFormProps) {
  const { addExperience, updateExperience, deleteExperience } = useResume()
  const [experience, setExperience] = useState<Experience[]>(initialExperience)
  const [newEntry, setNewEntry] = useState<Partial<Experience>>({})

  const handleAddExperience = () => {
    const id = Date.now().toString()
    const entry: Experience = {
      id,
      company: newEntry.company || '',
      position: newEntry.position || '',
      startDate: newEntry.startDate || '',
      endDate: newEntry.endDate || '',
      current: newEntry.current || false,
      description: newEntry.description || '',
    }
    setExperience([...experience, entry])
    addExperience(entry)
    setNewEntry({})
  }

  const handleDeleteExperience = (id: string) => {
    setExperience(experience.filter(e => e.id !== id))
    deleteExperience(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button size="sm" variant="outline" onClick={handleAddExperience} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experience.map(entry => (
          <div key={entry.id} className="p-4 border border-border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{entry.position}</h4>
                <p className="text-sm text-muted-foreground">{entry.company}</p>
              </div>
              <button onClick={() => handleDeleteExperience(entry.id)} className="text-destructive hover:text-destructive/80">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {entry.startDate} - {entry.current ? 'Present' : entry.endDate}
            </p>
            <p className="text-sm text-foreground line-clamp-2">{entry.description}</p>
          </div>
        ))}
      </div>

      {/* Add Experience Form */}
      <div className="p-4 border border-dashed border-border rounded-lg space-y-3">
        <Input
          placeholder="Company Name"
          value={newEntry.company || ''}
          onChange={(e) => setNewEntry({ ...newEntry, company: e.target.value })}
        />
        <Input
          placeholder="Job Title"
          value={newEntry.position || ''}
          onChange={(e) => setNewEntry({ ...newEntry, position: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Start Date"
            value={newEntry.startDate || ''}
            onChange={(e) => setNewEntry({ ...newEntry, startDate: e.target.value })}
          />
          <Input
            placeholder="End Date"
            value={newEntry.endDate || ''}
            onChange={(e) => setNewEntry({ ...newEntry, endDate: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="Describe your responsibilities and achievements..."
          value={newEntry.description || ''}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
          rows={3}
        />
        {newEntry.description && (
          <AIEnhancer
            content={newEntry.description}
            onEnhance={(enhanced) => setNewEntry({ ...newEntry, description: enhanced })}
            placeholder="Enhance Description"
          />
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newEntry.current || false}
            onChange={(e) => setNewEntry({ ...newEntry, current: e.target.checked })}
          />
          <span className="text-sm">Currently working here</span>
        </label>
        <Button size="sm" onClick={handleAddExperience} className="w-full">Add Entry</Button>
      </div>
    </div>
  )
}
