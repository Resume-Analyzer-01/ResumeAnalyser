const templates = [
  { 
    id: 'executive-minimal',
    title: 'Executive Minimal', 
    category: 'Leadership', 
    score: 'ATS-safe', 
    sections: 'Summary, Impact, Board Metrics',
    audience: 'Senior leaders and operators',
    tone: 'Minimal',
    layout: 'split',
    visual: 'executive-minimal',
    description: 'A restrained leadership template built around measurable scope, strategic impact, and board-level outcomes.',
    tags: ['ATS safe', 'Metrics-first', 'Board-ready'],
    highlights: ['Executive summary', 'Operating scale', 'Board metrics'],
    fileName: 'executive-minimal.md'
  },
  { 
    id: 'technical-product',
    title: 'Technical Product', 
    category: 'Product', 
    score: 'Keyword-rich', 
    sections: 'Skills, Launches, Experiments',
    audience: 'Product managers and builders',
    tone: 'Structured',
    layout: 'grid',
    visual: 'technical-product',
    description: 'A product-led format with room for APIs, launches, experiments, and cross-functional execution.',
    tags: ['SaaS', 'Launches', 'Technical skills'],
    highlights: ['Product scope', 'Tech stack', 'Experiment wins'],
    fileName: 'technical-product.md'
  },
  { 
    id: 'early-career',
    title: 'Early Career', 
    category: 'Starter', 
    score: 'Clean', 
    sections: 'Education, Projects, Internship',
    audience: 'Students and new graduates',
    tone: 'Clear',
    layout: 'centered',
    visual: 'early-career',
    description: 'A clean starter resume that gives projects, internships, education, and campus leadership equal weight.',
    tags: ['Internships', 'Projects', 'One page'],
    highlights: ['Education block', 'Project proof', 'Leadership'],
    fileName: 'early-career.md'
  },
  { 
    id: 'data-storyteller',
    title: 'Data Storyteller', 
    category: 'Analytics', 
    score: 'Structured', 
    sections: 'Tools, Dashboards, Business Wins',
    audience: 'Analysts and BI specialists',
    tone: 'Insight-led',
    layout: 'timeline',
    visual: 'data-storyteller',
    description: 'A dashboard-friendly layout for analysts who need to connect tools, models, and business decisions.',
    tags: ['Dashboards', 'SQL', 'Storytelling'],
    highlights: ['Tool stack', 'Business wins', 'Data projects'],
    fileName: 'data-storyteller.md'
  },
  {
    id: 'modern-sidebar',
    title: 'Modern Sidebar',
    category: 'General',
    score: 'Balanced',
    sections: 'Profile, Experience, Skills, Links',
    audience: 'Multi-role professionals',
    tone: 'Modern',
    layout: 'sidebar',
    visual: 'modern-sidebar',
    description: 'A polished two-column template with a compact sidebar for skills, links, and quick contact details.',
    tags: ['Two-column', 'Modern', 'Compact'],
    highlights: ['Sidebar skills', 'Career profile', 'Role history'],
    fileName: 'modern-sidebar.md'
  },
  {
    id: 'creative-portfolio',
    title: 'Creative Portfolio',
    category: 'Creative',
    score: 'Portfolio-ready',
    sections: 'Bio, Selected Work, Skills, Clients',
    audience: 'Designers, writers, and creators',
    tone: 'Editorial',
    layout: 'magazine',
    visual: 'creative-portfolio',
    description: 'A portfolio-style resume that keeps creative work visible while preserving scan-friendly sections.',
    tags: ['Portfolio', 'Clients', 'Creative'],
    highlights: ['Selected work', 'Client wins', 'Portfolio links'],
    fileName: 'creative-portfolio.md'
  },
  {
    id: 'corporate-classic',
    title: 'Corporate Classic',
    category: 'Corporate',
    score: 'Formal',
    sections: 'Summary, Experience, Certifications',
    audience: 'Finance, operations, and admin roles',
    tone: 'Traditional',
    layout: 'split',
    visual: 'corporate-classic',
    description: 'A conservative professional format for highly structured industries and formal application processes.',
    tags: ['Formal', 'Certifications', 'ATS safe'],
    highlights: ['Compliance skills', 'Certifications', 'Promotions'],
    fileName: 'corporate-classic.md'
  },
  {
    id: 'sales-growth',
    title: 'Sales Growth',
    category: 'Sales',
    score: 'Revenue-focused',
    sections: 'Quota, Pipeline, Wins, Tools',
    audience: 'Sales and revenue teams',
    tone: 'Bold',
    layout: 'timeline',
    visual: 'sales-growth',
    description: 'A results-first template that spotlights quota attainment, pipeline ownership, and repeatable growth wins.',
    tags: ['Quota', 'Revenue', 'CRM'],
    highlights: ['Quota metrics', 'Pipeline impact', 'Sales tools'],
    fileName: 'sales-growth.md'
  },
  {
    id: 'healthcare-professional',
    title: 'Healthcare Professional',
    category: 'Healthcare',
    score: 'Credential-ready',
    sections: 'Licenses, Care Impact, Clinical Skills',
    audience: 'Clinical and healthcare staff',
    tone: 'Calm',
    layout: 'sidebar',
    visual: 'healthcare-professional',
    description: 'A clear healthcare resume with dedicated space for credentials, care environments, and measurable outcomes.',
    tags: ['Licenses', 'Clinical skills', 'Patient care'],
    highlights: ['Licensure', 'Care metrics', 'Clinical systems'],
    fileName: 'healthcare-professional.md'
  },
  {
    id: 'academic-cv',
    title: 'Academic CV',
    category: 'Academic',
    score: 'Detailed',
    sections: 'Research, Publications, Teaching',
    audience: 'Researchers and educators',
    tone: 'Scholarly',
    layout: 'grid',
    visual: 'academic-cv',
    description: 'A longer-form CV structure for research output, teaching experience, grants, and academic service.',
    tags: ['Research', 'Teaching', 'Publications'],
    highlights: ['Publications', 'Teaching record', 'Awards'],
    fileName: 'academic-cv.md'
  },
  {
    id: 'marketing-brand',
    title: 'Marketing Brand',
    category: 'Marketing',
    score: 'Campaign-ready',
    sections: 'Positioning, Campaigns, Channels, Metrics',
    audience: 'Brand and growth marketers',
    tone: 'Polished',
    layout: 'magazine',
    visual: 'marketing-brand',
    description: 'A marketing resume built for campaign ownership, channel performance, and brand storytelling.',
    tags: ['Campaigns', 'Growth', 'Brand'],
    highlights: ['Channel metrics', 'Campaign wins', 'Brand systems'],
    fileName: 'marketing-brand.md'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    category: 'Design',
    score: 'Case-study ready',
    sections: 'Profile, Case Studies, Research, Tools',
    audience: 'UX and product designers',
    tone: 'Human-centered',
    layout: 'sidebar',
    visual: 'ux-designer',
    description: 'A design-focused template that connects research, product thinking, and shipped interface work.',
    tags: ['UX research', 'Case studies', 'Figma'],
    highlights: ['Design process', 'Product impact', 'Portfolio links'],
    fileName: 'ux-designer.md'
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    category: 'Operations',
    score: 'Delivery-focused',
    sections: 'Programs, Timelines, Budgets, Stakeholders',
    audience: 'Project and program managers',
    tone: 'Organized',
    layout: 'timeline',
    visual: 'project-manager',
    description: 'A delivery-led format for showing scope, ownership, risk management, and measurable project outcomes.',
    tags: ['Delivery', 'Budgets', 'Stakeholders'],
    highlights: ['Program scope', 'Risk control', 'Timeline delivery'],
    fileName: 'project-manager.md'
  },
  {
    id: 'teacher-educator',
    title: 'Teacher Educator',
    category: 'Education',
    score: 'Credential-ready',
    sections: 'Certification, Classroom Impact, Curriculum',
    audience: 'Teachers and education staff',
    tone: 'Warm',
    layout: 'centered',
    visual: 'teacher-educator',
    description: 'A clear education resume for classroom leadership, curriculum planning, and student outcomes.',
    tags: ['Teaching', 'Curriculum', 'Certification'],
    highlights: ['Student growth', 'Classroom tools', 'Credentials'],
    fileName: 'teacher-educator.md'
  },
  {
    id: 'customer-success',
    title: 'Customer Success',
    category: 'Customer Success',
    score: 'Retention-focused',
    sections: 'Book of Business, Renewals, Adoption, Tools',
    audience: 'CSMs and account teams',
    tone: 'Relationship-led',
    layout: 'grid',
    visual: 'customer-success',
    description: 'A customer success template for renewals, adoption programs, customer health, and expansion revenue.',
    tags: ['Renewals', 'Adoption', 'Accounts'],
    highlights: ['Retention metrics', 'Customer health', 'Expansion wins'],
    fileName: 'customer-success.md'
  }
]

const getDownloadUrl = (req, fileName) => {
  return `${req.protocol}://${req.get('host')}/storage/templates/${fileName}`
}

const serializeTemplate = (req, template) => {
  const { fileName, ...templateDetails } = template

  return {
    ...templateDetails,
    downloadUrl: getDownloadUrl(req, fileName)
  }
}

export const getAllTemplates = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: templates.map((template) => serializeTemplate(req, template))
    })
  } catch (error) {
    next(error)
  }
}
