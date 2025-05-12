import vine from '@vinejs/vine'

export const createMatchValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    userId: vine.string().uuid(),
  })
)

export const updateMatchValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).optional(),
  })
)
