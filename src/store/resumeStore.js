import { create } from 'zustand'
import { RESUME_TEMPLATES } from '../constants/templatesData'
import api from '../lib/axios'

// Helper deep copy function for history state stack
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export const useResumeStore = create((set, get) => ({
  // State
  selectedTemplate: RESUME_TEMPLATES[0],
  resumeData: deepCopy(RESUME_TEMPLATES[0]),
  resumeId: null,
  resumeName: 'My Professional Resume',
  activeElementId: 'fullName',
  activeSectionId: 'header',
  isSaving: false,
  lastSaved: null,
  history: [deepCopy(RESUME_TEMPLATES[0])],
  historyIndex: 0,
  zoom: 0.60,
  viewMode: 'split', // 'split' | 'canvas' | 'preview'
  atsAnalysis: null,
  isAnalyzingATS: false,

  // Helper to record history state
  recordHistory: (newData) => {
    const { history, historyIndex } = get()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(deepCopy(newData))
    set({
      resumeData: newData,
      history: newHistory,
      historyIndex: newHistory.length - 1
    })
  },

  // Actions
  setSelectedTemplate: (template) => {
    const copy = deepCopy(template)
    set({
      selectedTemplate: template,
      resumeData: copy,
      activeElementId: copy.sections[0]?.elements?.[0]?.id || null,
      activeSectionId: copy.sections[0]?.id || null,
      history: [deepCopy(copy)],
      historyIndex: 0
    })
  },

  setResumeName: (name) => set({ resumeName: name }),

  setActiveElement: (elementId, sectionId = null) => {
    set({ activeElementId: elementId, activeSectionId: sectionId })
  },

  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.5), 1.5) }),

  setViewMode: (mode) => set({ viewMode: mode }),

  updateElement: (sectionId, elementId, updates) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.elements) return

    const element = section.elements.find((e) => e.id === elementId)
    if (!element) return

    Object.assign(element, updates)
    get().recordHistory(currentData)
  },

  updateSectionStyle: (sectionId, styleUpdates) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section) return

    section.style = { ...(section.style || {}), ...styleUpdates }
    get().recordHistory(currentData)
  },

  updateSectionTitle: (sectionId, newTitle) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section) return

    section.title = newTitle
    get().recordHistory(currentData)
  },

  updateSectionContent: (sectionId, newContent) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section) return

    section.content = newContent
    get().recordHistory(currentData)
  },

  addEntry: (sectionId) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.entries) return

    const newId = `entry-${Date.now()}`
    if (sectionId === 'education') {
      section.entries.push({
        id: newId,
        school: 'University Name',
        degree: 'Degree / Major',
        year: '2020 - 2024',
        gpa: '3.8 / 4.0'
      })
    } else {
      section.entries.push({
        id: newId,
        company: 'Company Name',
        position: 'Job Position / Title',
        duration: '2022 - Present',
        location: 'City, Country',
        description: '• Key responsibility or measurable achievement.\n• Led key project or initiative.'
      })
    }

    get().recordHistory(currentData)
  },

  updateEntry: (sectionId, entryId, field, value) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.entries) return

    const entry = section.entries.find((e) => e.id === entryId)
    if (!entry) return

    entry[field] = value
    get().recordHistory(currentData)
  },

  removeEntry: (sectionId, entryId) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.entries) return

    section.entries = section.entries.filter((e) => e.id !== entryId)
    get().recordHistory(currentData)
  },

  addSkillTag: (sectionId, newTag) => {
    if (!newTag || !newTag.trim()) return
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.tags) return

    section.tags.push(newTag.trim())
    get().recordHistory(currentData)
  },

  removeSkillTag: (sectionId, tagIndex) => {
    const currentData = deepCopy(get().resumeData)
    const section = currentData.sections.find((s) => s.id === sectionId)
    if (!section || !section.tags) return

    section.tags.splice(tagIndex, 1)
    get().recordHistory(currentData)
  },

  applyColorPalette: (colors) => {
    const currentData = deepCopy(get().resumeData)
    currentData.colors = { ...currentData.colors, ...colors }
    // Update header & text primary colors
    currentData.sections.forEach((sec) => {
      if (sec.style && sec.style.titleColor) {
        sec.style.titleColor = colors.primary || sec.style.titleColor
      }
      if (sec.elements) {
        sec.elements.forEach((el) => {
          if (el.id === 'fullName') el.color = colors.primary || el.color
          if (el.id === 'jobTitle') el.color = colors.accent || el.color
        })
      }
    })
    get().recordHistory(currentData)
  },

  applyFontFamily: (fontFamily) => {
    const currentData = deepCopy(get().resumeData)
    currentData.fonts.heading = fontFamily
    currentData.fonts.body = fontFamily
    currentData.sections.forEach((sec) => {
      if (sec.elements) {
        sec.elements.forEach((el) => {
          el.fontFamily = fontFamily
        })
      }
    })
    get().recordHistory(currentData)
  },

  undo: () => {
    const { history, historyIndex } = get()
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1
      set({
        resumeData: deepCopy(history[prevIndex]),
        historyIndex: prevIndex
      })
    }
  },

  redo: () => {
    const { history, historyIndex } = get()
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1
      set({
        resumeData: deepCopy(history[nextIndex]),
        historyIndex: nextIndex
      })
    }
  },

  saveResume: async () => {
    set({ isSaving: true })
    try {
      const { resumeId, resumeName, selectedTemplate, resumeData } = get()
      let res
      if (resumeId) {
        res = await api.put(`/resumes/builder/${resumeId}`, {
          name: resumeName,
          templateId: selectedTemplate.id,
          resumeData
        })
      } else {
        res = await api.post('/resumes/builder', {
          name: resumeName,
          templateId: selectedTemplate.id,
          resumeData
        })
      }

      if (res.data?.success) {
        set({
          resumeId: res.data.data._id,
          lastSaved: new Date(),
          isSaving: false
        })
        return res.data.data
      }
    } catch (err) {
      console.error('Failed to save resume:', err)
      set({ isSaving: false })
      throw err
    }
  },

  loadResumeFromBackend: async (id) => {
    try {
      const res = await api.get(`/resumes/builder/${id}`)
      if (res.data?.success && res.data.data) {
        const loaded = res.data.data
        set({
          resumeId: loaded._id,
          resumeName: loaded.name || 'Saved Resume',
          resumeData: loaded.resumeData,
          history: [deepCopy(loaded.resumeData)],
          historyIndex: 0,
          atsAnalysis: loaded.atsScore || null
        })
      }
    } catch (err) {
      console.error('Failed to load resume:', err)
    }
  },

  runATSAnalysis: async (jobDescription = '') => {
    const { resumeId } = get()
    if (!resumeId) {
      // First save if not saved yet
      await get().saveResume()
    }
    const currentResumeId = get().resumeId
    if (!currentResumeId) return

    set({ isAnalyzingATS: true })
    try {
      const res = await api.post(`/resumes/builder/${currentResumeId}/analyze-ats`, { jobDescription })
      if (res.data?.success) {
        set({
          atsAnalysis: res.data.data.analysis,
          isAnalyzingATS: false
        })
        return res.data.data.analysis
      }
    } catch (err) {
      console.error('ATS Analysis Error:', err)
      set({ isAnalyzingATS: false })
      throw err
    }
  }
}))
