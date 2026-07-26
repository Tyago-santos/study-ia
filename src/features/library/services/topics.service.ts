import { mockTopics } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { Topic } from '@/shared/types'

let topics = [...mockTopics]

export const topicsService = {
  getAll: () => delay([...topics]),

  create: async (data: { subjectId: string; name: string }) => {
    const topic: Topic = {
      id: nextId('t'),
      subjectId: data.subjectId,
      name: data.name,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    topics.push(topic)
    return delay({ ...topic })
  },

  toggle: async (id: string) => {
    const idx = topics.findIndex((t) => t.id === id)
    if (idx === -1) throw new Error('Topic not found')
    topics[idx] = { ...topics[idx], completed: !topics[idx].completed }
    return delay({ ...topics[idx] })
  },

  delete: async (id: string) => {
    topics = topics.filter((t) => t.id !== id)
    return delay(undefined as void)
  },
}
