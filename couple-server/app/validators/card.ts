import vine from '@vinejs/vine'

export const createCardValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().minLength(100),
  })
)
