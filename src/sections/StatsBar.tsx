const stats = [
  { value: 12, suffix: '+', label: 'ERP modules on the roadmap' },
  { value: 3, suffix: '+', label: 'Years combined product experience' },
  { value: 1, suffix: '', label: 'Unified platform architecture' },
  { value: 100, suffix: '%', label: 'In-house design & engineering' },
]

export default function StatsBar() {
  return (
    <section className="border-t border-b border-border bg-bg-primary">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center relative">
              <div className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight">
                <span>{stat.value}</span>
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">{stat.label}</p>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
