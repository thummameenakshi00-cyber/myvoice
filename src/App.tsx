import PracticePage from './pages/PracticePage'

const NAV_TABS = [
  { id: 'practice', label: 'Practice', icon: MicIcon },
] as const

type TabId = typeof NAV_TABS[number]['id']

function MicIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2" width="6" height="9" rx="3" fill={active ? '#2D6A4F' : 'none'} stroke={active ? '#2D6A4F' : 'currentColor'} />
      <path d="M4 10a6 6 0 0 0 12 0" />
      <line x1="10" y1="16" x2="10" y2="19" />
      <line x1="7" y1="19" x2="13" y2="19" />
    </svg>
  )
}

export default function App() {
  const activeTab: TabId = 'practice'

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: '#f8f5ed' }}>
      {/* Top Header */}
      <header className="sticky top-0 z-20 border-b border-[#e8e2d5]" style={{ backgroundColor: '#f8f5ed' }}>
        <div className="max-w-xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#2D6A4F' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="1" width="6" height="8" rx="3" />
                <path d="M2 8a6 6 0 0 0 12 0" />
                <line x1="8" y1="13" x2="8" y2="15.5" />
                <line x1="5.5" y1="15.5" x2="10.5" y2="15.5" />
              </svg>
            </div>
            <span className="text-[18px] font-700 text-[#1a1a1a] tracking-tight">MyVoice</span>
          </div>
          <span
            className="text-xs font-600 px-3 py-1 rounded-full"
            style={{ backgroundColor: '#D8F3DC', color: '#2D6A4F' }}
          >
            Daily Trainer
          </span>
        </div>

        {/* Tab Bar */}
        <div className="max-w-xl mx-auto px-5 pb-0 flex gap-1">
          {NAV_TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-600 rounded-t-xl transition-colors duration-150 border-b-2"
                style={{
                  color: isActive ? '#2D6A4F' : '#9b9080',
                  borderBottomColor: isActive ? '#2D6A4F' : 'transparent',
                  backgroundColor: isActive ? 'rgba(45,106,79,0.06)' : 'transparent',
                }}
              >
                <tab.icon active={isActive} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-xl mx-auto w-full px-5 pt-7">
        {activeTab === 'practice' && <PracticePage />}
      </main>
    </div>
  )
}
