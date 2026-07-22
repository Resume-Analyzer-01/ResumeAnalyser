import React, { useState, useRef, useEffect } from 'react'

export const EditableTextElement = ({
  element,
  sectionId,
  isSelected,
  onSelect,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(element.content || '')
  const inputRef = useRef(null)

  useEffect(() => {
    setText(element.content || '')
  }, [element.content])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    if (text !== element.content) {
      onUpdate(element.id, { content: text })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
    }
  }

  const style = {
    fontFamily: element.fontFamily || 'Inter',
    fontSize: `${element.fontSize || 14}px`,
    fontWeight: element.fontWeight || '400',
    color: element.color || 'inherit',
    letterSpacing: element.letterSpacing ? `${element.letterSpacing}px` : 'normal',
    lineHeight: element.lineHeight || 1.3
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onSelect(element.id, sectionId)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        setIsEditing(true)
      }}
      className={`relative group cursor-pointer transition-all rounded px-1 py-0.5 min-w-[60px] ${
        isSelected
          ? 'ring-2 ring-cyan-400 bg-cyan-500/10'
          : 'hover:outline hover:outline-1 hover:outline-cyan-400/60'
      }`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-white text-slate-900 border border-cyan-400 rounded px-1 outline-none w-full shadow-md font-sans"
          style={style}
        />
      ) : (
        <div style={style} className="whitespace-pre-wrap select-none">
          {element.content || element.placeholder || '[Click to Edit Text]'}
        </div>
      )}

      {/* Visual Bounding Box Tooltip */}
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none border border-slate-700 flex items-center gap-1 z-20">
          <span className="text-cyan-400 font-bold">{element.label || 'Text Node'}</span>
          <span className="text-slate-400">({element.fontSize || 14}px)</span>
        </div>
      )}
    </div>
  )
}
