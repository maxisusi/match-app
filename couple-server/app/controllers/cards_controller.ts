import Card from '#models/card'
import { createCardValidator, indexCardValidator, updateCardValidator } from '#validators/card'
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
  async destroy({ request, response }: HttpContext) {
    return await indexCardValidator
      .validate(request.params())
      .then((idx) => Card.findByOrFail({ cardId: idx.id }))
      .then(async (card) => await card.delete().then(() => response.ok(card)))
      .catch(() => response.status(404))
  }
  async update({ request, response }: HttpContext) {
    const cardId = await indexCardValidator
      .validate(request.params())
      .then((card) => card.id)
      .catch((e) => null)

    if (cardId === null) {
      return response.status(404)
    }

    return await updateCardValidator.validate(request.body()).then((payload) =>
      Card.findByOrFail({ cardId: cardId }).then(async (card) => {
        card.merge({
          title: payload?.title,
          description: payload?.description,
          status: payload?.status,
        })
        await card.save()
        return response.ok(card)
      })
    )
  }
}
