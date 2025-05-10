import Card from '#models/card'
import { createCardValidator, indexCardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  show() {}
  async index({ request, response }: HttpContext) {
    return await indexCardValidator
      .validate(request.params())
      .then((idx) => Card.findByOrFail({ cardId: idx.id }))
      .catch(() => response.status(404))
  }
  async store({ request }: HttpContext) {
    const card = await createCardValidator.validate(request.body())
    return await Card.create({
      ...card,
      status: 'private',
    })
  }
  update() {}
  destroy() {}
}
