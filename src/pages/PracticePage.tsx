import { useState, useCallback } from 'react'
import { getRandomTopics, type Topic } from '../data/topics'
import TopicCard from '../components/TopicCard'
import CountdownTimer from '../components/CountdownTimer'
import { supabase } from '../lib/supabase'

const SPIN_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M13.5 3A6.5 6.5 0 1 0 14.5 8" />
    <polyline points="13.5,0 13.5,3.5 10,3.5" />
  </svg>
)

export default function PracticePage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [spinning, setSpinning] = useState(false)
  const [topicsKey, setTopicsKey] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSpin = useCallback(() => {
    setSpinning(true)
    setTopicsKey(k => k + 1)
    setTimeout(() => {
      setTopics(getRandomTopics(3))
      setSpinning(false)
    }, 180)
  }, [])

  const handleTimerComplete = useCallback(() => {
    // subtle prompt to add transcript
  }, [])

  const handleSave = async () => {
    if (!transcript.trim()) return
    setSaving(true)
    try {
      await supabase.from('practice_sessions').insert({
        transcript: transcript.trim(),
        topic_texts: topics.map(t => t.text),
        duration_seconds: 60,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (_e) {
      // silently fail if table doesn't exist yet
    }
    setSaving(false)
  }

  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* === Section 1: Topics === */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-700 text-[#1a1a1a]">Today's Topics</h2>
            <p className="text-[13px] text-[#6b6b6b] mt-0.5">Pick one and speak for 1 minute.</p>
          </div>
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-150 active:scale-95 hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#2D6A4F' }}
          >
            <span className={spinning ? 'animate-spin' : ''}>{SPIN_ICON}</span>
            Spin Topics
          </button>
        </div>

        {topics.length === 0 ? (
          <button
            onClick={handleSpin}
            className="w-full border-2 border-dashed border-[#c8c0af] rounded-2xl py-10 flex flex-col items-center gap-3 text-[#9b9080] hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors duration-200 group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M27 6A13 13 0 1 0 29 16" />
                <polyline points="27,0 27,7 20,7" />
              </svg>
            </span>
            <span className="text-sm font-600">Tap to spin topics</span>
          </button>
        ) : (
          <div key={topicsKey} className="flex flex-col gap-3">
            {topics.map((topic, i) => (
              <TopicCard key={topic.id} topic={topic} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="h-px bg-[#e8e2d5]" />

      {/* === Section 2: Timer === */}
      <section className="flex flex-col items-center gap-2">
        <h2 className="text-[18px] font-700 text-[#1a1a1a] self-start">1-Minute Timer</h2>
        <p className="text-[13px] text-[#6b6b6b] self-start mb-3">Speak until the timer ends — no stopping!</p>
        <CountdownTimer onComplete={handleTimerComplete} />
      </section>

      {/* Divider */}
      <div className="h-px bg-[#e8e2d5]" />

      {/* === Section 3: Transcript === */}
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-[18px] font-700 text-[#1a1a1a]">Your Transcript</h2>
          <p className="text-[13px] text-[#6b6b6b] mt-0.5">Write or paste what you said to review it later.</p>
        </div>

        <textarea
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
          rows={6}
          placeholder="Paste or type your speech here..."
          className="w-full rounded-2xl border border-[#e8e2d5] bg-white p-4 text-[15px] text-[#1a1a1a] placeholder-[#bab5ac] resize-none focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:border-[#2D6A4F] transition-all duration-200 leading-relaxed"
        />

        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#bab5ac]">
            {transcript.trim().split(/\s+/).filter(Boolean).length} words
          </span>
          <button
            onClick={handleSave}
            disabled={!transcript.trim() || saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-600 transition-all duration-200 active:scale-95 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: saved ? '#52B788' : '#2D6A4F' }}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,7 5.5,10.5 12,3.5" />
                </svg>
                Saved!
              </>
            ) : saving ? 'Saving…' : 'Save Session'}
          </button>
        </div>
      </section>
    </div>
  )
}
