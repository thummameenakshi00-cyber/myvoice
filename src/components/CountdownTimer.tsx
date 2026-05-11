import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL = 60

interface Props {
  onComplete?: () => void
}

export default function CountdownTimer({ onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(TOTAL)
  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'done'>('idle')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearTimer()
            setStatus('done')
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return clearTimer
  }, [status, clearTimer, onComplete])

  const handleStart = () => {
    if (status === 'idle' || status === 'paused') setStatus('running')
  }
  const handlePause = () => {
    if (status === 'running') {
      clearTimer()
      setStatus('paused')
    }
  }
  const handleReset = () => {
    clearTimer()
    setTimeLeft(TOTAL)
    setStatus('idle')
  }

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / TOTAL
  const dashOffset = circumference * (1 - progress)

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`

  const isRunning = status === 'running'
  const isDone = status === 'done'

  return (
    <div className="flex flex-col items-center gap-5">
      {/* SVG Timer Ring */}
      <div className="relative flex items-center justify-center">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className={isRunning ? 'timer-ring-active' : ''}
        >
          {/* Track */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#e8e2d5"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={isDone ? '#B5451B' : '#2D6A4F'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center">
          <span
            className="text-[2rem] font-700 leading-none tabular-nums"
            style={{ color: isDone ? '#B5451B' : '#2D6A4F' }}
          >
            {timeStr}
          </span>
          <span className="text-[11px] text-[#6b6b6b] font-500 mt-0.5 uppercase tracking-widest">
            {isDone ? 'Done!' : isRunning ? 'Speaking' : status === 'paused' ? 'Paused' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {(status === 'idle' || status === 'paused') && (
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-150 active:scale-95 hover:opacity-90"
            style={{ backgroundColor: '#2D6A4F' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <polygon points="3,1 13,7 3,13" />
            </svg>
            {status === 'paused' ? 'Resume' : 'Start'}
          </button>
        )}

        {status === 'running' && (
          <button
            onClick={handlePause}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-150 active:scale-95 hover:opacity-90"
            style={{ backgroundColor: '#2D6A4F' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
            Pause
          </button>
        )}

        {status === 'done' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-150 active:scale-95 hover:opacity-90"
            style={{ backgroundColor: '#B5451B' }}
          >
            Again
          </button>
        )}

        {status !== 'idle' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-600 border transition-all duration-150 active:scale-95 hover:bg-[#f0ece3]"
            style={{ color: '#6b6b6b', borderColor: '#e8e2d5' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M11 2.5A5.5 5.5 0 1 0 12 6.5" />
              <polyline points="11,0 11,3 8,3" />
            </svg>
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
