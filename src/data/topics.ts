export interface Topic {
  id: number
  text: string
  category: string
  categoryColor: string
}

export const TOPICS: Topic[] = [
  // Everyday Life
  { id: 1, text: 'Describe your morning routine and why it matters to you.', category: 'Everyday Life', categoryColor: '#2D6A4F' },
  { id: 2, text: 'Talk about a meal you recently cooked or ate.', category: 'Everyday Life', categoryColor: '#2D6A4F' },
  { id: 3, text: 'What chores do you dislike the most and why?', category: 'Everyday Life', categoryColor: '#2D6A4F' },
  { id: 4, text: 'Describe your neighborhood and what you like about it.', category: 'Everyday Life', categoryColor: '#2D6A4F' },
  { id: 5, text: 'What is your commute like? How do you feel about it?', category: 'Everyday Life', categoryColor: '#2D6A4F' },

  // Opinion & Debate
  { id: 6, text: 'Should smartphones be banned in schools?', category: 'Opinion', categoryColor: '#B5451B' },
  { id: 7, text: 'Is remote work better than going to an office?', category: 'Opinion', categoryColor: '#B5451B' },
  { id: 8, text: 'Are social media influencers a positive force in society?', category: 'Opinion', categoryColor: '#B5451B' },
  { id: 9, text: 'Should fast food be taxed more heavily?', category: 'Opinion', categoryColor: '#B5451B' },
  { id: 10, text: 'Is it more important to be happy or to be successful?', category: 'Opinion', categoryColor: '#B5451B' },

  // Storytelling
  { id: 11, text: 'Tell a story about a time you got completely lost.', category: 'Story', categoryColor: '#7B5EA7' },
  { id: 12, text: 'Describe the most embarrassing thing that happened to you at work or school.', category: 'Story', categoryColor: '#7B5EA7' },
  { id: 13, text: 'Share a moment when you had to make a difficult decision quickly.', category: 'Story', categoryColor: '#7B5EA7' },
  { id: 14, text: "Tell about the best trip or vacation you've ever taken.", category: 'Story', categoryColor: '#7B5EA7' },
  { id: 15, text: 'Describe a challenge you overcame and what you learned.', category: 'Story', categoryColor: '#7B5EA7' },

  // Future & Imagination
  { id: 16, text: 'If you could live in any era of history, when would it be and why?', category: 'Imagination', categoryColor: '#C2780C' },
  { id: 17, text: 'Describe your ideal home in 10 years.', category: 'Imagination', categoryColor: '#C2780C' },
  { id: 18, text: 'If you could have any superpower, what would it be?', category: 'Imagination', categoryColor: '#C2780C' },
  { id: 19, text: 'What would the world look like if cars had never been invented?', category: 'Imagination', categoryColor: '#C2780C' },
  { id: 20, text: 'If you could have dinner with any person, living or dead, who would it be?', category: 'Imagination', categoryColor: '#C2780C' },

  // Work & Career
  { id: 21, text: 'Describe your dream job and what makes it appealing.', category: 'Career', categoryColor: '#1A6B8A' },
  { id: 22, text: 'What skills do you think will be most important in the workplace in 10 years?', category: 'Career', categoryColor: '#1A6B8A' },
  { id: 23, text: 'Talk about a professional goal you are working toward.', category: 'Career', categoryColor: '#1A6B8A' },
  { id: 24, text: 'How do you handle disagreements with colleagues?', category: 'Career', categoryColor: '#1A6B8A' },
  { id: 25, text: "Describe the best manager or mentor you've ever had.", category: 'Career', categoryColor: '#1A6B8A' },

  // Culture & Society
  { id: 26, text: 'What is something unique about the culture you grew up in?', category: 'Culture', categoryColor: '#8A5340' },
  { id: 27, text: 'How has technology changed the way people socialize?', category: 'Culture', categoryColor: '#8A5340' },
  { id: 28, text: 'Describe a tradition or holiday that is important to you.', category: 'Culture', categoryColor: '#8A5340' },
  { id: 29, text: 'How do you think social media affects relationships?', category: 'Culture', categoryColor: '#8A5340' },
  { id: 30, text: 'What is the most interesting cultural difference you have experienced?', category: 'Culture', categoryColor: '#8A5340' },
]

export function getRandomTopics(count: number = 3): Topic[] {
  const shuffled = [...TOPICS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
