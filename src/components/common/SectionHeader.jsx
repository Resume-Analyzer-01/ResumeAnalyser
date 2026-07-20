export const SectionHeader = ({ eyebrow, title, description, align = 'left', className = '' }) => {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-600 dark:text-cyan-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  )
}
