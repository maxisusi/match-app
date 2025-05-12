import Card from '#models/card'
import { createCardValidator, updateCardValidator } from '#validators/card'
import { indexCardValidator } from '#validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  show() {
    throw new Error('Method not implemented.')
  }
  async index({ request, response }: HttpContext) {
    return await indexCardValidator
      .validate(request.params())
      .then((idx) => Card.findByOrFail({ cardId: idx.id }))
      .catch(() => response.status(404))
  }
  async store({ request, response }: HttpContext) {
    const card = await createCardValidator.validate(request.body())
    return await Card.create({
      ...card,
      status: 'private',
    }).then((c) => {
      response.created(c)
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
      .catch(() => null)

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
