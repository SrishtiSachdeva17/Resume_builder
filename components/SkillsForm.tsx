'use client'

import { useState } from 'react'
import { useResume, Skill } from '@/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus } from 'lucide-react'

interface SkillsFormProps {
  initialSkills?: Skill[]
}

export function SkillsForm({ initialSkills = [] }: SkillsFormProps) {
  const { addSkill, deleteSkill } = useResume()
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [newSkill, setNewSkill] = useState({ name: '', category: '' })

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return

    const id = Date.now().toString()
    const skill: Skill = {
      id,
      name: newSkill.name,
      category: newSkill.category || 'General',
    }
    setSkills([...skills, skill])
    addSkill(skill)
    setNewSkill({ name: '', category: '' })
  }

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id))
    deleteSkill(id)
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <span className="text-sm text-muted-foreground">{skills.length} skills</span>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {categorySkills.map(skill => (
                <div
                  key={skill.id}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-sm"
                >
                  {skill.name}
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="text-destructive hover:text-destructive/80 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Form */}
      <div className="p-4 border border-dashed border-border rounded-lg space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Skill (e.g., React, Python)"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSkill()
              }
            }}
          />
          <Input
            placeholder="Category (e.g., Technical)"
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
          />
        </div>
        <Button size="sm" onClick={handleAddSkill} className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>
    </div>
  )
}
