'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Wand2, Loader2 } from 'lucide-react'

interface AIEnhancerProps {
  content: string
  onEnhance: (enhancedContent: string) => void
  placeholder?: string
}

export function AIEnhancer({ content, onEnhance, placeholder = "Enhance with AI" }: AIEnhancerProps) {
  const [loading, setLoading] = useState(false)
  const [enhancedText, setEnhancedText] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const handleEnhance = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to enhance content')
      }

      const data = await response.json()
      setEnhancedText(data.enhanced)
      setShowPreview(true)
    } catch (error) {
      console.error('[v0] AI enhancement failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    onEnhance(enhancedText)
    setShowPreview(false)
    setEnhancedText('')
  }

  if (showPreview && enhancedText) {
    return (
      <div className="border border-border rounded-lg p-4 bg-secondary/30">
        <h4 className="font-semibold mb-3 text-sm">AI Enhanced Version</h4>
        <div className="bg-background p-3 rounded mb-4 text-sm text-foreground leading-relaxed">
          {enhancedText}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleApply} className="gap-2">
            <Wand2 className="w-4 h-4" />
            Apply Enhancement
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowPreview(false)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={handleEnhance}
      disabled={loading || !content.trim()}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Enhancing...
        </>
      ) : (
        <>
          <Wand2 className="w-4 h-4" />
          {placeholder}
        </>
      )}
    </Button>
  )
}
