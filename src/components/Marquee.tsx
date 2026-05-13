import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function Marquee({ children, speed = 30, className = '' }: MarqueeProps) {
  const items = Array(8).fill(children)
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex-shrink-0">{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="flex-shrink-0">{item}</span>
        ))}
      </div>
    </div>
  )
}
