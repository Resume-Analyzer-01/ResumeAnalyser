import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

export const exportResumeToPDF = async (elementId = 'resume-canvas-document', fileName = 'Resume.pdf') => {
  const originalElement = document.getElementById(elementId)
  if (!originalElement) {
    throw new Error('Canvas element not found for PDF export')
  }

  // 1. Create off-screen container mounted in body so Tailwind CSS styles apply 100%
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '-9999px'
  container.style.left = '-9999px'
  container.style.width = '850px'
  container.style.zIndex = '-9999'
  document.body.appendChild(container)

  // 2. Deep clone the resume canvas element
  const clone = originalElement.cloneNode(true)
  clone.style.transform = 'none'
  clone.style.margin = '0'
  clone.style.boxShadow = 'none'
  clone.style.width = '850px'
  clone.style.minHeight = '1100px'

  // 3. Remove all editor-only UI controls (.no-print, buttons)
  const noPrintEls = clone.querySelectorAll('.no-print, button')
  noPrintEls.forEach((el) => el.remove())

  // 4. Convert <input> elements into clean <span> elements while preserving exact Tailwind classes & inline styles
  const inputs = clone.querySelectorAll('input')
  inputs.forEach((input) => {
    const val = input.value || ''
    const span = document.createElement('span')
    span.textContent = val
    span.className = input.className
    span.style.cssText = input.style.cssText
    span.style.display = 'inline-block'
    span.style.border = 'none'

    if (input.parentNode) {
      input.parentNode.replaceChild(span, input)
    }
  })

  // 5. Convert <textarea> elements into clean <div> elements while preserving Tailwind classes & inline styles
  const textareas = clone.querySelectorAll('textarea')
  textareas.forEach((ta) => {
    const val = ta.value || ''
    const div = document.createElement('div')
    div.textContent = val
    div.className = ta.className
    div.style.cssText = ta.style.cssText
    div.style.whiteSpace = 'pre-wrap'
    div.style.border = 'none'

    if (ta.parentNode) {
      ta.parentNode.replaceChild(div, ta)
    }
  })

  // 6. Remove editor selection outline rings
  const highlights = clone.querySelectorAll('.ring-1, .ring-cyan-400, .bg-cyan-500\\/5')
  highlights.forEach((h) => {
    h.classList.remove('ring-1', 'ring-cyan-400', 'ring-cyan-400/40', 'bg-cyan-500/5')
  })

  container.appendChild(clone)

  try {
    // html2canvas-pro natively supports modern CSS color functions (oklab, oklch, color-mix)
    const canvas = await html2canvas(clone, {
      scale: 2, // High resolution DPI
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 850,
      windowHeight: 1100
    })

    // 7. Generate high-quality A4 PDF with jsPDF
    const imgData = canvas.toDataURL('image/jpeg', 0.98)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [850, 1100]
    })

    pdf.addImage(imgData, 'JPEG', 0, 0, 850, 1100)
    pdf.save(fileName)

    return true
  } catch (error) {
    console.error('PDF Export Error:', error)
    throw error
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
}
