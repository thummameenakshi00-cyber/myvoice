import type { Topic } from '../data/topics'

interface Props {
  topic: Topic
  index: number
}

export default function TopicCard({ topic, index }: Props) {
  return (
    <div
      key={`${topic.id}-${index}`}
      className="card-animate bg-white rounded-2xl p-5 shadow-sm border border-[#e8e2d5] flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
      style={{ opacity: 0 }}
    >
      <span
        className="self-start text-xs font-600 tracking-wide px-3 py-1 rounded-full text-white"
        style={{ backgroundColor: topic.categoryColor }}
      >
        {topic.category}
      </span>
      <p className="text-[#1a1a1a] text-[15px] leading-relaxed font-400">
        {topic.text}
      </p>
    </div>
  )
}
