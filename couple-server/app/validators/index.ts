import vine from '@vinejs/vine'

export const indexCardValidator = vine.compile(
  vine.object({
    id: vine.string().uuid(),
  })
)
