import {
  Award,
  BarChart3,
  Bell,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  FileText,
  Gauge,
  GraduationCap,
  Languages,
  LineChart,
  Lock,
  MessageSquareText,
  PenLine,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  UserRoundCheck,
  Wand2,
  Zap
} from 'lucide-react'

export const userProfile = {
  name: 'Riley Carter',
  role: 'Senior Product Manager',
  email: 'riley.carter@example.com',
  phone: '+1 415 555 0198',
  linkedin: 'linkedin.com/in/rileycarter',
  github: 'github.com/rileycarter',
  portfolio: 'rileycarter.dev',
  bio: 'Product leader focused on AI workflows, lifecycle analytics, and hiring systems.',
  plan: 'Pro Member',
  analysesLeft: 12,
  language: 'English'
}

export const trustedCompanies = ['Workday', 'Greenhouse', 'Lever', 'Ashby', 'BambooHR', 'Oracle']

export const featureCards = [
  {
    title: 'ATS Score',
    description: 'Measure resume compatibility against modern applicant tracking systems.',
    icon: Gauge,
    accent: 'from-indigo-500 to-sky-500'
  },
  {
    title: 'Resume Review',
    description: 'Find weak bullets, missing impact, and formatting gaps before recruiters do.',
    icon: FileCheck2,
    accent: 'from-fuchsia-500 to-violet-500'
  },
  {
    title: 'AI Suggestions',
    description: 'Rewrite experience into sharper, role-aligned language with clear outcomes.',
    icon: Wand2,
    accent: 'from-cyan-500 to-emerald-500'
  },
  {
    title: 'Keyword Match',
    description: 'Compare role requirements against resume language and skill coverage.',
    icon: Target,
    accent: 'from-amber-500 to-rose-500'
  },
  {
    title: 'Resume Templates',
    description: 'Choose clean, ATS-safe layouts for technical, executive, and creative roles.',
    icon: BookOpenCheck,
    accent: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Grammar Check',
    description: 'Catch tense, clarity, punctuation, and consistency issues in every section.',
    icon: PenLine,
    accent: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'Skills Analysis',
    description: 'Reveal missing skills and rank strengths against target role expectations.',
    icon: BrainCircuit,
    accent: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Experience Analysis',
    description: 'Evaluate scope, seniority, ownership, and measurable business impact.',
    icon: BriefcaseBusiness,
    accent: 'from-slate-700 to-cyan-500'
  },
  {
    title: 'Resume Optimization',
    description: 'Prioritize the highest leverage changes for better recruiter response.',
    icon: Zap,
    accent: 'from-violet-500 to-cyan-500'
  }
]

export const howItWorks = [
  {
    step: '01',
    title: 'Upload Resume',
    description: 'Drop a PDF or DOCX file into a secure, polished upload flow.',
    icon: FileText
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Mock scoring reviews ATS readiness, keywords, formatting, and grammar.',
    icon: BrainCircuit
  },
  {
    step: '03',
    title: 'Get Report',
    description: 'View dashboards, progress signals, and section-by-section findings.',
    icon: LineChart
  },
  {
    step: '04',
    title: 'Improve Resume',
    description: 'Apply prioritized recommendations and export a polished report.',
    icon: Sparkles
  }
]

export const scoreBreakdown = [
  { label: 'ATS Score', value: 92, color: 'bg-indigo-500' },
  { label: 'Keyword Match', value: 86, color: 'bg-cyan-500' },
  { label: 'Grammar Score', value: 94, color: 'bg-emerald-500' },
  { label: 'Formatting', value: 81, color: 'bg-amber-500' },
  { label: 'Impact Language', value: 88, color: 'bg-fuchsia-500' }
]

export const analysisSections = [
  {
    title: 'Skills',
    score: 89,
    icon: BrainCircuit,
    items: ['Product analytics', 'Experiment design', 'Stakeholder management']
  },
  {
    title: 'Projects',
    score: 82,
    icon: BriefcaseBusiness,
    items: ['Add launch metrics', 'Show technical collaboration', 'Clarify ownership']
  },
  {
    title: 'Education',
    score: 91,
    icon: GraduationCap,
    items: ['Clear credentials', 'Relevant coursework visible', 'Good chronology']
  },
  {
    title: 'Experience',
    score: 88,
    icon: Award,
    items: ['Strong seniority signal', 'Quantify early roles', 'Lead with business impact']
  }
]

export const recommendations = [
  'Add target-role keywords for AI workflow, lifecycle analytics, and roadmap ownership.',
  'Convert responsibility bullets into outcome bullets with metrics and timeframes.',
  'Reduce dense paragraphs in the summary and keep each line scannable.',
  'Move certification details near the skills section for stronger ATS extraction.'
]

export const testimonials = [
  {
    name: 'Maya Shah',
    role: 'Data Analyst',
    quote: 'ResumeAI helped me understand why my applications were stalling and what to fix first.',
    rating: 5
  },
  {
    name: 'Jordan Lee',
    role: 'Frontend Engineer',
    quote: 'The score breakdown made it easy to tune my resume for each role without guessing.',
    rating: 5
  },
  {
    name: 'Elena Brooks',
    role: 'Program Manager',
    quote: 'The recommendations were practical, specific, and polished enough to use immediately.',
    rating: 5
  }
]

export const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For quick checks and first-time resume reviews.',
    features: ['3 resume scans', 'ATS score preview', 'Basic keyword feedback', 'PDF upload'],
    cta: 'Start Free',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For active job seekers optimizing every application.',
    features: ['Unlimited analyses', 'AI recommendations', 'History and reports', 'Template library', 'Priority exports'],
    cta: 'Upgrade to Pro',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'team plan',
    description: 'For career teams, bootcamps, and workforce programs.',
    features: ['Team dashboard', 'Admin analytics', 'Custom scoring rubrics', 'SSO-ready architecture'],
    cta: 'Contact Sales',
    highlighted: false
  }
]

export const faqItems = [
  {
    title: 'Is this connected to a real AI model?',
    content: 'This frontend uses realistic mock data and service placeholders so backend and AI integrations can be added later.'
  },
  {
    title: 'Which file formats are supported?',
    content: 'The upload flow is designed for PDF and DOCX resumes with validation-friendly controls.'
  },
  {
    title: 'Does ResumeAI save my resume?',
    content: 'The current frontend does not persist files. Storage and authentication are intentionally left for backend integration.'
  },
  {
    title: 'Can I download the analysis report?',
    content: 'The report actions are present as frontend placeholders and ready to connect to a report generation API.'
  }
]

export const dashboardStats = [
  { label: 'Average ATS Score', value: '88%', change: '+12%', icon: Gauge, tone: 'from-indigo-500 to-sky-500' },
  { label: 'Resumes Analyzed', value: '42', change: '+8 this month', icon: FileCheck2, tone: 'from-fuchsia-500 to-violet-500' },
  { label: 'Keyword Coverage', value: '91%', change: '+6%', icon: Target, tone: 'from-cyan-500 to-emerald-500' },
  { label: 'Open Reports', value: '7', change: '3 ready', icon: BarChart3, tone: 'from-amber-500 to-rose-500' }
]

export const resumeHistory = [
  { id: 1, name: 'Riley_Carter_PM.pdf', date: 'Jul 14, 2026', score: 92, status: 'Completed', role: 'Product Manager' },
  { id: 2, name: 'Riley_AI_Strategy.docx', date: 'Jul 11, 2026', score: 86, status: 'Completed', role: 'AI Product Lead' },
  { id: 3, name: 'Resume_Growth_PM.pdf', date: 'Jul 03, 2026', score: 78, status: 'Needs Review', role: 'Growth PM' },
  { id: 4, name: 'Executive_Profile.pdf', date: 'Jun 28, 2026', score: 90, status: 'Completed', role: 'Director of Product' },
  { id: 5, name: 'Operations_Resume.docx', date: 'Jun 18, 2026', score: 73, status: 'Draft', role: 'Program Lead' }
]

export const notifications = [
  { title: 'Report ready', body: 'Riley_Carter_PM.pdf analysis is complete.', icon: CheckCircle2, tone: 'success' },
  { title: 'Keyword gap found', body: 'Add lifecycle analytics to improve PM match.', icon: ScanSearch, tone: 'warning' },
  { title: 'Security check', body: 'Profile settings were updated successfully.', icon: ShieldCheck, tone: 'primary' }
]

export const activity = [
  { label: 'ATS parsing', value: 92 },
  { label: 'Recruiter scan', value: 88 },
  { label: 'Keyword fit', value: 86 },
  { label: 'Writing clarity', value: 94 }
]

export const templateCards = [
  { title: 'Executive Minimal', category: 'Leadership', score: 'ATS-safe', sections: 'Summary, Impact, Board Metrics' },
  { title: 'Technical Product', category: 'Product', score: 'Keyword-rich', sections: 'Skills, Launches, Experiments' },
  { title: 'Early Career', category: 'Starter', score: 'Clean', sections: 'Education, Projects, Internship' },
  { title: 'Data Storyteller', category: 'Analytics', score: 'Structured', sections: 'Tools, Dashboards, Business Wins' }
]

export const settingsGroups = [
  {
    title: 'Account',
    icon: UserRoundCheck,
    options: ['Personal information', 'Billing email', 'Connected accounts']
  },
  {
    title: 'Appearance',
    icon: Sparkles,
    options: ['Theme preference', 'Reduced motion', 'Compact tables']
  },
  {
    title: 'Notifications',
    icon: Bell,
    options: ['Report completion', 'Weekly summaries', 'Product updates']
  },
  {
    title: 'Privacy',
    icon: Lock,
    options: ['Resume retention', 'Analytics sharing', 'Export data']
  },
  {
    title: 'Language',
    icon: Languages,
    options: ['English', 'Spanish', 'French']
  }
]

export const contactChannels = [
  { title: 'Support', value: 'support@resumeai.app', icon: MessageSquareText },
  { title: 'Sales', value: 'sales@resumeai.app', icon: BriefcaseBusiness },
  { title: 'Security', value: 'security@resumeai.app', icon: ShieldCheck }
]

export const insightsSample = {
  score: 88,
  summary: 'This profile reads like a high-velocity product leader with strong execution depth and market-facing storytelling.',
  strengths: ['Cross-functional leadership', 'Strategic product thinking', 'Clear measurable outcomes'],
  risks: ['More quantified impact in early career', 'Add sector-specific keywords'],
  metrics: [
    { label: 'Keyword fit', value: '92%' },
    { label: 'Narrative clarity', value: '86%' },
    { label: 'Leadership signal', value: '91%' }
  ]
}
