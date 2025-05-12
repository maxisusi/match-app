import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(100),
    userId: vine.string().uuid(),
  })
)

export const updateCardValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).optional(),
    description: vine.string().minLength(100).optional(),
    status: vine.enum(['private', 'public']).optional(),
  })
)
