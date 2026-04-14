'use client'

import { useState } from 'react'
import { useResume, PersonalInfo } from '@/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AIEnhancer } from './AIEnhancer'

interface PersonalInfoFormProps {
  initialData?: PersonalInfo
  onSave?: () => void
}

export function PersonalInfoForm({ initialData, onSave }: PersonalInfoFormProps) {
  const { updatePersonalInfo } = useResume()
  const [formData, setFormData] = useState<PersonalInfo>(
    initialData || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updatePersonalInfo(formData)
    onSave?.()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <Input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Professional Summary</label>
          <AIEnhancer
            content={formData.summary}
            onEnhance={(enhanced) => setFormData(prev => ({ ...prev, summary: enhanced }))}
            placeholder="Enhance"
          />
        </div>
        <Textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Write a brief summary of your professional background and goals..."
          rows={4}
        />
      </div>

      <Button onClick={handleSave}>Save Personal Info</Button>
    </div>
  )
}
