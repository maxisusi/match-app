import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(100),
    userId: vine.string().uuid(),
  })
)

export const indexCardValidator = vine.compile(
  vine.object({
    id: vine.string().uuid(),
  })
)
