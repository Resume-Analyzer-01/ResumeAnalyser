import React, { useState } from 'react'
import { Network, Zap, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react'

export const SkillTaxonomyVisualizer = ({ userSkills = ['React', 'Node.js', 'TypeScript', 'JavaScript'] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const taxonomyData = [
    {
      id: 'react',
      name: 'React.js',
      category: 'Frontend',
      demandScore: 92,
      salaryBoost: 18,
      prerequisites: ['JavaScript', 'HTML/CSS'],
      complements: ['Redux', 'Zustand', 'Next.js', 'Tailwind CSS']
    },
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      category: 'Backend',
      demandScore: 90,
      salaryBoost: 22,
      prerequisites: ['Java'],
      complements: ['Microservices', 'Kafka', 'PostgreSQL', 'Docker']
    },
    {
      id: 'python',
      name: 'Python NLP',
      category: 'AI / Backend',
      demandScore: 95,
      salaryBoost: 20,
      prerequisites: ['Python Basics'],
      complements: ['FastAPI', 'spaCy', 'Pandas', 'Docker']
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'DevOps',
      demandScore: 88,
      salaryBoost: 25,
      prerequisites: ['Docker', 'Linux'],
      complements: ['AWS', 'Helm', 'CI/CD Pipelines']
    }
  ]

  const categories = ['All', 'Frontend', 'Backend', 'AI / Backend', 'DevOps']

  const filtered = selectedCategory === 'All'
    ? taxonomyData
    : taxonomyData.filter((t) => t.category === selectedCategory)

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl space-y-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Network className="w-5 h-5 text-cyan-500" />
            <span>Skill Dependency & Context Graph</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Contextual skill tree showing prerequisites, complementary tech stacks, and estimated market salary multipliers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition font-semibold ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skill Graph Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const userHas = userSkills.some((s) => s.toLowerCase().includes(item.id))
          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 space-y-3 transition ${
                userHas
                  ? 'border-cyan-500/50 bg-cyan-500/5 shadow-md'
                  : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      userHas ? 'bg-cyan-500 shadow-sm shadow-cyan-500' : 'bg-slate-400'
                    }`}
                  />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                  <span className="text-[10px] font-mono bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>+{item.salaryBoost}% Boost</span>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="text-xs space-y-1">
                <span className="text-slate-500 dark:text-slate-400 block font-semibold text-[11px]">
                  Prerequisites to Learn:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.prerequisites.map((pre) => (
                    <span
                      key={pre}
                      className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[11px]"
                    >
                      {pre}
                    </span>
                  ))}
                </div>
              </div>

              {/* Complementary Tech Stack */}
              <div className="text-xs space-y-1 pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-cyan-600 dark:text-cyan-400 block font-semibold text-[11px]">
                  Context Multipliers (+10% score per match):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.complements.map((comp) => (
                    <span
                      key={comp}
                      className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-md text-[11px] font-medium"
                    >
                      + {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
