// 15+ Canva-Style Professional Resume Seed Templates

export const RESUME_TEMPLATES = [
  {
    id: 'minimal-modern',
    name: 'Minimal Modern',
    category: 'Modern',
    description: 'Clean white canvas with emerald green accents, ideal for tech & startup roles.',
    thumbnailColor: 'from-emerald-800 to-emerald-600',
    colors: {
      primary: '#1a472a',
      accent: '#4ade80',
      text: '#1f2937',
      lightText: '#6b7280',
      background: '#ffffff',
      sectionBorder: '#e5e7eb'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 110 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #1a472a' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'ALEXANDER PIERCE', x: 0, y: 0, fontSize: 32, fontWeight: '700', color: '#1a472a', fontFamily: 'Poppins', letterSpacing: 1 },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Lead Full-Stack Software Engineer', x: 0, y: 42, fontSize: 15, fontWeight: '600', color: '#16a34a', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'alexander.p@example.com  |  +1 (555) 234-5678  |  San Francisco, CA  |  linkedin.com/in/alexpierce', x: 0, y: 70, fontSize: 10, fontWeight: '400', color: '#6b7280', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'PROFESSIONAL SUMMARY',
        layout: { x: 50, y: 170, width: 750 },
        style: { titleColor: '#1a472a', titleFontSize: 13 },
        content: 'Results-driven Senior Full-Stack Engineer with 7+ years of experience building high-scale microservices, cloud applications, and responsive React interfaces. Proven track record of improving system throughput by 40% and mentoring agile engineering teams.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'WORK EXPERIENCE',
        layout: { x: 50, y: 270, width: 750, entrySpacing: 18 },
        style: { titleColor: '#1a472a', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'TechCorp Solutions',
            position: 'Senior Full-Stack Engineer',
            duration: '2021 - Present',
            location: 'San Francisco, CA',
            description: '• Architected GraphQL API gateway handling 15M+ daily requests with 99.99% uptime.\n• Spearheaded migration from legacy monolith to Next.js & AWS Lambda, reducing page load times by 55%.\n• Directed a cross-functional team of 8 engineers delivering features 2 weeks ahead of schedule.'
          },
          {
            id: 'exp-2',
            company: 'Innovate Labs',
            position: 'Software Engineer',
            duration: '2018 - 2021',
            location: 'San Jose, CA',
            description: '• Developed real-time telemetry dashboard using React, WebSockets, and Node.js.\n• Optimized PostgreSQL query performance, cutting average query latency from 450ms to 60ms.\n• Implemented automated CI/CD deployment pipelines using GitHub Actions & Docker.'
          }
        ]
      },
      {
        id: 'skills',
        type: 'sectionWithTags',
        title: 'TECHNICAL SKILLS',
        layout: { x: 50, y: 550, width: 750, tagStyle: 'pill' },
        style: { titleColor: '#1a472a', titleFontSize: 13 },
        tags: ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'AWS', 'Docker', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'Jest', 'CI/CD']
      },
      {
        id: 'education',
        type: 'sectionWithEntries',
        title: 'EDUCATION',
        layout: { x: 50, y: 670, width: 750 },
        style: { titleColor: '#1a472a', titleFontSize: 13 },
        entries: [
          {
            id: 'edu-1',
            school: 'University of California, Berkeley',
            degree: 'B.S. in Computer Science',
            year: '2014 - 2018',
            gpa: '3.8 / 4.0'
          }
        ]
      },
      {
        id: 'projects',
        type: 'sectionWithEntries',
        title: 'KEY PROJECTS',
        layout: { x: 50, y: 780, width: 750 },
        style: { titleColor: '#1a472a', titleFontSize: 13 },
        entries: [
          {
            id: 'proj-1',
            company: 'CloudMetrics Open Source',
            position: 'Creator & Maintainer',
            duration: '2023',
            location: '',
            description: 'High-performance distributed logging CLI tool built in Node.js with over 2,500 GitHub stars.'
          }
        ]
      }
    ]
  },
  {
    id: 'bold-exec',
    name: 'Bold Exec',
    category: 'Executive',
    description: 'Dark navy sidebar layout with emerald highlights, designed for senior leaders.',
    thumbnailColor: 'from-slate-900 via-emerald-950 to-slate-900',
    colors: {
      primary: '#0f172a',
      accent: '#10b981',
      text: '#334155',
      lightText: '#64748b',
      background: '#ffffff',
      sectionBorder: '#cbd5e1'
    },
    fonts: {
      heading: 'Outfit',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    sections: [
      {
        id: 'sidebar-left',
        type: 'sidebar',
        layout: { x: 0, y: 0, width: 270, height: 1100 },
        style: { backgroundColor: '#0f172a', textColor: '#f8fafc' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'VICTORIA\nSTERLING', x: 30, y: 50, fontSize: 26, fontWeight: '800', color: '#ffffff', fontFamily: 'Outfit', lineHeight: 1.1 },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'VP of Technology & Product', x: 30, y: 120, fontSize: 13, fontWeight: '600', color: '#34d399', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'v.sterling@execmail.com\n+1 (555) 987-6543\nNew York, NY\nlinkedin.com/in/vsterling', x: 30, y: 165, fontSize: 10, fontWeight: '400', color: '#cbd5e1', fontFamily: 'Inter', lineHeight: 1.6 }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'EXECUTIVE PROFILE',
        layout: { x: 300, y: 50, width: 500 },
        style: { titleColor: '#0f172a', titleFontSize: 14 },
        content: 'Visionary Technology Executive with 12+ years driving digital transformation, scaling enterprise SaaS platforms from $10M to $100M ARR, and building high-performing engineering organizations across global locations.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'LEADERSHIP EXPERIENCE',
        layout: { x: 300, y: 180, width: 500, entrySpacing: 20 },
        style: { titleColor: '#0f172a', titleFontSize: 14 },
        entries: [
          {
            id: 'exp-1',
            company: 'Apex Financial Technologies',
            position: 'Vice President of Engineering',
            duration: '2020 - Present',
            location: 'New York, NY',
            description: '• Managed $24M engineering budget and led 65+ personnel across 4 countries.\n• Oversaw core cloud architecture redesign, increasing system reliability to 99.999%.\n• Accelerated product release velocity by 300% through DevOps automation.'
          },
          {
            id: 'exp-2',
            company: 'Nexus SaaS Group',
            position: 'Director of Product Engineering',
            duration: '2016 - 2020',
            location: 'Boston, MA',
            description: '• Scaled customer engineering team from 12 to 45 engineers during rapid hypergrowth.\n• Spearheaded SOC2 Compliance certification and enterprise security architecture.'
          }
        ]
      },
      {
        id: 'skills',
        type: 'sectionWithTags',
        title: 'CORE COMPETENCIES',
        layout: { x: 300, y: 520, width: 500, tagStyle: 'pill' },
        style: { titleColor: '#0f172a', titleFontSize: 14 },
        tags: ['Strategic Planning', 'Enterprise Architecture', 'Cloud Infrastructure', 'Budgeting & P&L', 'Agile Leadership', 'M&A Tech Integration', 'SaaS Growth']
      },
      {
        id: 'education',
        type: 'sectionWithEntries',
        title: 'EDUCATION & CREDENTIALS',
        layout: { x: 300, y: 670, width: 500 },
        style: { titleColor: '#0f172a', titleFontSize: 14 },
        entries: [
          {
            id: 'edu-1',
            school: 'MIT Sloan School of Management',
            degree: 'Executive MBA',
            year: '2018',
            gpa: ''
          },
          {
            id: 'edu-2',
            school: 'Columbia University',
            degree: 'B.S. Computer Engineering',
            year: '2012',
            gpa: 'Magna Cum Laude'
          }
        ]
      }
    ]
  },
  {
    id: 'chronological-classic',
    name: 'Chronological Classic',
    category: 'Classic',
    description: 'Traditional ATS-optimized layout with clear linear sections and refined typography.',
    thumbnailColor: 'from-gray-700 to-gray-900',
    colors: {
      primary: '#1e293b',
      accent: '#2563eb',
      text: '#1e293b',
      lightText: '#475569',
      background: '#ffffff',
      sectionBorder: '#cbd5e1'
    },
    fonts: {
      heading: 'Times New Roman',
      body: 'Roboto'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '1px solid #1e293b' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'BENJAMIN H. FRANKLIN', x: 0, y: 0, fontSize: 30, fontWeight: '700', color: '#1e293b', fontFamily: 'Roboto' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Senior Financial Analyst & Operations Specialist', x: 0, y: 40, fontSize: 14, fontWeight: '500', color: '#2563eb', fontFamily: 'Roboto' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'b.franklin@finance.org  |  (555) 345-6789  |  Chicago, IL  |  linkedin.com/in/bhfranklin', x: 0, y: 65, fontSize: 10, fontWeight: '400', color: '#475569', fontFamily: 'Roboto' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'PROFESSIONAL SUMMARY',
        layout: { x: 50, y: 160, width: 750 },
        style: { titleColor: '#1e293b', titleFontSize: 13 },
        content: 'Detail-oriented Financial Analyst with 6+ years of experience conducting quantitative financial modeling, variance analysis, and corporate budgeting. Expert in Excel/VBA, SQL, and forecasting models that drive strategic cost reductions.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'PROFESSIONAL EXPERIENCE',
        layout: { x: 50, y: 260, width: 750, entrySpacing: 18 },
        style: { titleColor: '#1e293b', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'Global Capital Management',
            position: 'Senior Financial Analyst',
            duration: '2021 - Present',
            location: 'Chicago, IL',
            description: '• Prepared annual budget models exceeding $180M in operating expenditure.\n• Automated monthly reporting packages in Power BI, cutting manual consolidation time by 15 hours/month.\n• Evaluated strategic vendor contracts, yielding $1.2M in annualized cost savings.'
          },
          {
            id: 'exp-2',
            company: 'Midwest Banking Corp',
            position: 'Financial Analyst',
            duration: '2018 - 2021',
            location: 'Chicago, IL',
            description: '• Built Monte Carlo simulation tools to assess credit risk across commercial portfolios.\n• Authored quarterly performance summaries for C-suite executive meetings.'
          }
        ]
      },
      {
        id: 'education',
        type: 'sectionWithEntries',
        title: 'EDUCATION',
        layout: { x: 50, y: 560, width: 750 },
        style: { titleColor: '#1e293b', titleFontSize: 13 },
        entries: [
          {
            id: 'edu-1',
            school: 'University of Chicago - Booth School of Business',
            degree: 'M.S. in Finance',
            year: '2018',
            gpa: '3.9 / 4.0'
          }
        ]
      },
      {
        id: 'skills',
        type: 'sectionWithTags',
        title: 'CORE COMPETENCIES',
        layout: { x: 50, y: 670, width: 750, tagStyle: 'pill' },
        style: { titleColor: '#1e293b', titleFontSize: 13 },
        tags: ['Financial Modeling', 'Variance Analysis', 'Corporate Budgeting', 'Power BI', 'SQL', 'Excel (VBA)', 'Tableau', 'Risk Assessment']
      }
    ]
  },
  {
    id: 'two-column-pro',
    name: 'Two-Column Pro',
    category: 'Modern',
    description: 'Clean split layout with left sidebar for contact & skills, right side for career history.',
    thumbnailColor: 'from-teal-800 to-slate-900',
    colors: {
      primary: '#0f766e',
      accent: '#14b8a6',
      text: '#1f2937',
      lightText: '#4b5563',
      background: '#ffffff',
      sectionBorder: '#ccfbf1'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 30, bottom: 30, left: 30, right: 30 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 40, y: 30, width: 770, height: 90 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #0f766e' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'SOPHIA CHEN', x: 0, y: 0, fontSize: 32, fontWeight: '700', color: '#0f766e', fontFamily: 'Poppins' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Senior UI/UX Product Designer', x: 0, y: 40, fontSize: 15, fontWeight: '600', color: '#0d9488', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'left-col',
        type: 'sidebar',
        layout: { x: 40, y: 140, width: 240, height: 900 },
        style: { backgroundColor: '#f0fdf4' },
        elements: [
          { id: 'contact', type: 'text', label: 'Contact Info', content: 'sophia.design@example.com\n+1 (555) 456-7890\nSeattle, WA\nsophiachen.design\nlinkedin.com/in/sophiadesign', x: 0, y: 0, fontSize: 10, fontWeight: '400', color: '#374151', fontFamily: 'Inter', lineHeight: 1.6 }
        ]
      },
      {
        id: 'skills',
        type: 'sectionWithTags',
        title: 'DESIGN SKILLS',
        layout: { x: 40, y: 290, width: 240, tagStyle: 'pill' },
        style: { titleColor: '#0f766e', titleFontSize: 12 },
        tags: ['Figma', 'UI Design', 'UX Research', 'Design Systems', 'Prototyping', 'User Testing', 'Wireframing', 'HTML/CSS']
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'WORK EXPERIENCE',
        layout: { x: 310, y: 140, width: 500, entrySpacing: 18 },
        style: { titleColor: '#0f766e', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'Creative Cloud Studios',
            position: 'Lead UX Designer',
            duration: '2021 - Present',
            location: 'Seattle, WA',
            description: '• Redesigned enterprise SaaS workflow used by 250k daily active users, increasing task completion by 34%.\n• Established component design system in Figma, reducing front-end handoff time by 40%.\n• Conducted 50+ user research interviews and usability testing sessions.'
          },
          {
            id: 'exp-2',
            company: 'Pixel Interactive',
            position: 'UI/UX Designer',
            duration: '2018 - 2021',
            location: 'Portland, OR',
            description: '• Created high-fidelity interactive prototypes for iOS and Android e-commerce mobile applications.\n• Collaborated with product managers and engineers in 2-week agile sprints.'
          }
        ]
      },
      {
        id: 'education',
        type: 'sectionWithEntries',
        title: 'EDUCATION',
        layout: { x: 310, y: 500, width: 500 },
        style: { titleColor: '#0f766e', titleFontSize: 13 },
        entries: [
          {
            id: 'edu-1',
            school: 'University of Washington',
            degree: 'B.S. in Human-Centered Design & Engineering',
            year: '2014 - 2018',
            gpa: '3.8 / 4.0'
          }
        ]
      }
    ]
  },
  {
    id: 'creative-dev',
    name: 'Creative Dev',
    category: 'Creative',
    description: 'Vibrant syntax-highlighted accents tailored for modern developers and creators.',
    thumbnailColor: 'from-purple-900 to-indigo-900',
    colors: {
      primary: '#6b21a8',
      accent: '#c084fc',
      text: '#1e1b4b',
      lightText: '#6b7280',
      background: '#ffffff',
      sectionBorder: '#f3e8ff'
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 110 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #6b21a8' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: '<DEV_MARCUS_VANCE />', x: 0, y: 0, fontSize: 28, fontWeight: '800', color: '#6b21a8', fontFamily: 'JetBrains Mono' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Full-Stack Developer & Open Source Contributor', x: 0, y: 42, fontSize: 14, fontWeight: '600', color: '#a855f7', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'marcus@devvance.io  |  github.com/mvance  |  Austin, TX  |  devvance.io', x: 0, y: 70, fontSize: 10, fontWeight: '400', color: '#6b7280', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'ABOUT ME',
        layout: { x: 50, y: 170, width: 750 },
        style: { titleColor: '#6b21a8', titleFontSize: 13 },
        content: 'Creative Full-Stack Developer specializing in React, Node.js, WebGL, and cloud microservices. Passionate about sleek user interactions, open-source tooling, and high-performance WebAssembly modules.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'EXPERIENCE',
        layout: { x: 50, y: 270, width: 750, entrySpacing: 18 },
        style: { titleColor: '#6b21a8', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'NextGen Digital Labs',
            position: 'Senior Frontend Engineer',
            duration: '2022 - Present',
            location: 'Austin, TX',
            description: '• Built interactive 3D product visualizers using Three.js and React Three Fiber.\n• Reduced web app bundle size by 45% through aggressive code-splitting and tree-shaking.\n• Spearheaded UI testing strategy achieving 92% code coverage using Vitest and Cypress.'
          }
        ]
      },
      {
        id: 'skills',
        type: 'sectionWithTags',
        title: 'TECH STACK',
        layout: { x: 50, y: 470, width: 750, tagStyle: 'pill' },
        style: { titleColor: '#6b21a8', titleFontSize: 13 },
        tags: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Node.js', 'GraphQL', 'TailwindCSS', 'WebGL', 'Docker', 'Vite', 'PostgreSQL']
      }
    ]
  },
  {
    id: 'academic-focus',
    name: 'Academic Focus',
    category: 'Academic',
    description: 'Detailed, research-heavy structure for students, scholars, and researchers.',
    thumbnailColor: 'from-amber-900 to-stone-900',
    colors: {
      primary: '#78350f',
      accent: '#d97706',
      text: '#1c1917',
      lightText: '#57534e',
      background: '#ffffff',
      sectionBorder: '#fde68a'
    },
    fonts: {
      heading: 'Lora',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #78350f' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'DR. ELENA ROSTOVA', x: 0, y: 0, fontSize: 30, fontWeight: '700', color: '#78350f', fontFamily: 'Lora' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Postdoctoral Research Fellow in Machine Learning', x: 0, y: 40, fontSize: 14, fontWeight: '600', color: '#d97706', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'elena.rostova@stanford.edu  |  Stanford, CA  |  scholar.google.com/erostova', x: 0, y: 65, fontSize: 10, fontWeight: '400', color: '#57534e', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'education',
        type: 'sectionWithEntries',
        title: 'EDUCATION & ACADEMIC DEGREES',
        layout: { x: 50, y: 160, width: 750 },
        style: { titleColor: '#78350f', titleFontSize: 13 },
        entries: [
          {
            id: 'edu-1',
            school: 'Stanford University',
            degree: 'Ph.D. in Computer Science (Artificial Intelligence)',
            year: '2019 - 2024',
            gpa: 'Dissertation: Neural Architecture Search for Edge Devices'
          },
          {
            id: 'edu-2',
            school: 'MIT',
            degree: 'B.S. in Applied Mathematics & Computer Science',
            year: '2015 - 2019',
            gpa: 'Summa Cum Laude'
          }
        ]
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'RESEARCH & TEACHING EXPERIENCE',
        layout: { x: 50, y: 350, width: 750, entrySpacing: 18 },
        style: { titleColor: '#78350f', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'Stanford AI Lab (SAIL)',
            position: 'Graduate Research Assistant',
            duration: '2019 - 2024',
            location: 'Stanford, CA',
            description: '• Conducted novel research on transformer model compression, reducing inference latency by 60%.\n• Co-authored 6 peer-reviewed papers published in NeurIPS, ICML, and CVPR.'
          }
        ]
      }
    ]
  },
  {
    id: 'startup-hustle',
    name: 'Startup Hustle',
    category: 'Creative',
    description: 'Trendy, energetic theme with bold titles designed for fast-paced growth companies.',
    thumbnailColor: 'from-emerald-600 to-teal-900',
    colors: {
      primary: '#047857',
      accent: '#10b981',
      text: '#111827',
      lightText: '#4b5563',
      background: '#ffffff',
      sectionBorder: '#a7f3d0'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '3px solid #10b981' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'LIAM O\'CONNOR', x: 0, y: 0, fontSize: 32, fontWeight: '800', color: '#047857', fontFamily: 'Poppins' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Growth Marketer & Product Operator', x: 0, y: 42, fontSize: 14, fontWeight: '700', color: '#10b981', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'liam@growthhustle.com  |  +1 (555) 789-0123  |  Austin, TX', x: 0, y: 68, fontSize: 10, fontWeight: '400', color: '#4b5563', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'SUMMARY',
        layout: { x: 50, y: 160, width: 750 },
        style: { titleColor: '#047857', titleFontSize: 13 },
        content: 'Data-driven Growth Lead with a history of driving 10x user acquisition pipelines for early-stage B2B SaaS startups. Skilled in viral loops, SEO automation, paid customer acquisition, and funnel optimization.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'EXPERIENCE',
        layout: { x: 50, y: 260, width: 750, entrySpacing: 18 },
        style: { titleColor: '#047857', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'ScaleUp Ventures',
            position: 'Head of Growth',
            duration: '2022 - Present',
            location: 'Austin, TX',
            description: '• Grew monthly active users from 10,000 to 250,000 within 14 months.\n• Managed $50k/month performance marketing budget across Google Ads & Meta Ads with 3.4x ROAS.'
          }
        ]
      }
    ]
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    category: 'Executive',
    description: 'Premium C-level design with elegant dark navy header banner and polished layout.',
    thumbnailColor: 'from-slate-950 via-blue-950 to-slate-900',
    colors: {
      primary: '#0f172a',
      accent: '#38bdf8',
      text: '#1e293b',
      lightText: '#64748b',
      background: '#ffffff',
      sectionBorder: '#e2e8f0'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 0, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 0, y: 0, width: 850, height: 140 },
        style: { backgroundColor: '#0f172a', textColor: '#ffffff' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'CATHERINE DEVEREAUX', x: 50, y: 35, fontSize: 34, fontWeight: '700', color: '#ffffff', fontFamily: 'Playfair Display' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Chief Financial Officer (CFO)', x: 50, y: 80, fontSize: 15, fontWeight: '500', color: '#38bdf8', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'c.devereaux@csuite.com  |  +1 (555) 888-9999  |  New York, NY', x: 50, y: 105, fontSize: 10, fontWeight: '400', color: '#cbd5e1', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'EXECUTIVE PROFILE',
        layout: { x: 50, y: 170, width: 750 },
        style: { titleColor: '#0f172a', titleFontSize: 13 },
        content: 'Seasoned Financial Officer with 15+ years overseeing global financial operations, capital allocation, investor relations, and successful IPO preparations for Fortune 500 tech firms.'
      },
      {
        id: 'experience',
        type: 'sectionWithEntries',
        title: 'EXECUTIVE EXPERIENCE',
        layout: { x: 50, y: 280, width: 750, entrySpacing: 18 },
        style: { titleColor: '#0f172a', titleFontSize: 13 },
        entries: [
          {
            id: 'exp-1',
            company: 'Vanguard Global Tech',
            position: 'Chief Financial Officer',
            duration: '2019 - Present',
            location: 'New York, NY',
            description: '• Directed financial operations for a $450M global technology enterprise.\n• Led successful $120M Series C funding round and prepared corporate audit for NASDAQ listing.'
          }
        ]
      }
    ]
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: 'Classic',
    description: 'Ultra-clean single-column monochrome design focused purely on content density.',
    thumbnailColor: 'from-gray-900 to-black',
    colors: {
      primary: '#111827',
      accent: '#374151',
      text: '#1f2937',
      lightText: '#6b7280',
      background: '#ffffff',
      sectionBorder: '#e5e7eb'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 90 },
        style: { backgroundColor: '#ffffff', borderBottom: '1px solid #111827' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'DANIEL KIM', x: 0, y: 0, fontSize: 28, fontWeight: '700', color: '#111827', fontFamily: 'Inter' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Backend Systems Architect', x: 0, y: 36, fontSize: 13, fontWeight: '500', color: '#4b5563', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'daniel.kim@email.com  •  +1 (555) 123-9876  •  Seattle, WA', x: 0, y: 60, fontSize: 10, fontWeight: '400', color: '#6b7280', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'SUMMARY',
        layout: { x: 50, y: 150, width: 750 },
        style: { titleColor: '#111827', titleFontSize: 12 },
        content: 'Software Architect with expertise in distributed systems, Golang, C++, and high-concurrency microservices processing billions of messages daily.'
      }
    ]
  },
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    category: 'Corporate',
    description: 'Corporate indigo & royal blue theme popular across finance and healthcare.',
    thumbnailColor: 'from-blue-700 to-indigo-900',
    colors: {
      primary: '#1e3a8a',
      accent: '#2563eb',
      text: '#1e293b',
      lightText: '#64748b',
      background: '#ffffff',
      sectionBorder: '#dbeafe'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Roboto'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #1e3a8a' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'JAMESON T. REID', x: 0, y: 0, fontSize: 30, fontWeight: '700', color: '#1e3a8a', fontFamily: 'Poppins' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Healthcare Operations Director', x: 0, y: 40, fontSize: 14, fontWeight: '600', color: '#2563eb', fontFamily: 'Roboto' }
        ]
      }
    ]
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    category: 'Modern',
    description: 'Balanced layout featuring full header with 2-column body content.',
    thumbnailColor: 'from-slate-800 to-cyan-900',
    colors: {
      primary: '#0891b2',
      accent: '#06b6d4',
      text: '#1e293b',
      lightText: '#64748b',
      background: '#ffffff',
      sectionBorder: '#cff4fc'
    },
    fonts: {
      heading: 'Outfit',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 40, right: 40 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 40, y: 40, width: 770, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '2px solid #0891b2' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'NATHAN DRAKE', x: 0, y: 0, fontSize: 30, fontWeight: '800', color: '#0891b2', fontFamily: 'Outfit' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Product Manager & Scrum Master', x: 0, y: 40, fontSize: 14, fontWeight: '600', color: '#0284c7', fontFamily: 'Inter' }
        ]
      }
    ]
  },
  {
    id: 'elegant',
    name: 'Elegant',
    category: 'Creative',
    description: 'Sophisticated Playfair Display serif typography with refined thin divider borders.',
    thumbnailColor: 'from-amber-950 to-stone-900',
    colors: {
      primary: '#451a03',
      accent: '#b45309',
      text: '#292524',
      lightText: '#78716c',
      background: '#ffffff',
      sectionBorder: '#fef3c7'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lora'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '1px solid #451a03' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'ISABELLA MONTAGUE', x: 0, y: 0, fontSize: 32, fontWeight: '700', color: '#451a03', fontFamily: 'Playfair Display' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Senior Brand Strategist & Copywriter', x: 0, y: 42, fontSize: 14, fontWeight: '500', color: '#b45309', fontFamily: 'Lora' }
        ]
      }
    ]
  },
  {
    id: 'compact',
    name: 'Compact',
    category: 'Compact',
    description: 'High-density space-efficient layout tailored for multi-page condensation into 1 page.',
    thumbnailColor: 'from-zinc-800 to-zinc-950',
    colors: {
      primary: '#27272a',
      accent: '#52525b',
      text: '#18181b',
      lightText: '#71717a',
      background: '#ffffff',
      sectionBorder: '#e4e4e7'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 30, bottom: 30, left: 40, right: 40 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 40, y: 30, width: 770, height: 80 },
        style: { backgroundColor: '#ffffff', borderBottom: '1px solid #27272a' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'ROBERT J. HAWKING', x: 0, y: 0, fontSize: 26, fontWeight: '700', color: '#27272a', fontFamily: 'Inter' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Principal Hardware & Embedded Systems Engineer', x: 0, y: 32, fontSize: 12, fontWeight: '600', color: '#52525b', fontFamily: 'Inter' }
        ]
      }
    ]
  },
  {
    id: 'colorful',
    name: 'Colorful',
    category: 'Creative',
    description: 'Playful multi-color section cards and badges designed for modern creative portfolios.',
    thumbnailColor: 'from-pink-600 via-purple-600 to-indigo-600',
    colors: {
      primary: '#9333ea',
      accent: '#ec4899',
      text: '#1f2937',
      lightText: '#6b7280',
      background: '#ffffff',
      sectionBorder: '#f3e8ff'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 100 },
        style: { backgroundColor: '#ffffff', borderBottom: '3px solid #ec4899' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'ZOEY KENSINGTON', x: 0, y: 0, fontSize: 32, fontWeight: '800', color: '#9333ea', fontFamily: 'Poppins' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Digital Content Lead & Illustrator', x: 0, y: 42, fontSize: 14, fontWeight: '600', color: '#ec4899', fontFamily: 'Inter' }
        ]
      }
    ]
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    category: 'Modern',
    description: 'Sleek dark theme canvas (#0f172a) with crisp light text & bright emerald accents.',
    thumbnailColor: 'from-slate-950 via-slate-900 to-emerald-950',
    colors: {
      primary: '#10b981',
      accent: '#34d399',
      text: '#f8fafc',
      lightText: '#94a3b8',
      background: '#0f172a',
      sectionBorder: '#1e293b'
    },
    fonts: {
      heading: 'Outfit',
      body: 'Inter'
    },
    pageSize: { width: 850, height: 1100 },
    margins: { top: 40, bottom: 40, left: 50, right: 50 },
    sections: [
      {
        id: 'header',
        type: 'header',
        layout: { x: 50, y: 40, width: 750, height: 110 },
        style: { backgroundColor: '#0f172a', borderBottom: '2px solid #10b981' },
        elements: [
          { id: 'fullName', type: 'text', label: 'Full Name', content: 'CYBER_ALEXIS_NEXUS', x: 0, y: 0, fontSize: 30, fontWeight: '800', color: '#34d399', fontFamily: 'Outfit' },
          { id: 'jobTitle', type: 'text', label: 'Job Title', content: 'Cybersecurity Analyst & DevSecOps Engineer', x: 0, y: 42, fontSize: 14, fontWeight: '600', color: '#10b981', fontFamily: 'Inter' },
          { id: 'contact', type: 'text', label: 'Contact', content: 'alexis@nexussec.io  |  +1 (555) 000-1111  |  Austin, TX', x: 0, y: 70, fontSize: 10, fontWeight: '400', color: '#94a3b8', fontFamily: 'Inter' }
        ]
      },
      {
        id: 'summary',
        type: 'sectionWithContent',
        title: 'SECURITY PROFILE',
        layout: { x: 50, y: 170, width: 750 },
        style: { titleColor: '#34d399', titleFontSize: 13 },
        content: 'DevSecOps Specialist with 6+ years auditing cloud infrastructure, hardening Kubernetes clusters, and conducting automated vulnerability penetration testing.'
      }
    ]
  }
]

export const GOOGLE_FONTS_LIST = [
  'Poppins',
  'Inter',
  'Roboto',
  'Playfair Display',
  'Outfit',
  'JetBrains Mono',
  'Montserrat',
  'Lora',
  'Oswald',
  'Raleway'
]
