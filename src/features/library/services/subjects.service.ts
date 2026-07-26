import { mockSubjects } from '@/shared/mocks/data'
import { delay, nextId } from '@/shared/mocks/helpers'
import type { Subject } from '@/shared/types'

let subjects = [...mockSubjects]

export const subjectsService = {
  getAll: () => delay([...subjects]),

  create: async (data: { name: string; color: string; icon?: string }) => {
    const subject: Subject = {
      id: nextId('s'),
      name: data.name,
      color: data.color,
      icon: data.icon,
      createdAt: new Date().toISOString(),
    }
    subjects.push(subject)
    return delay({ ...subject })
  },

  delete: async (id: string) => {
    subjects = subjects.filter((s) => s.id !== id)
    return delay(undefined as void)
  },
}
