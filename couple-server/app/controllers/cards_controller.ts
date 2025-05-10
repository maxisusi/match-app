import Card from '#models/card'
import { createCardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  async store({ request }: HttpContext) {
    const card = await createCardValidator.validate(request.body())
    return await Card.create({
      ...card,
      status: 'private',
    })
  }
  index() {}
  show() {}
  update() {}
  destroy() {}
}
