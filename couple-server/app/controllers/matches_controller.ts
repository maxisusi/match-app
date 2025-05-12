import Match from '#models/match'
import { indexCardValidator } from '#validators/index'
import { createMatchValidator } from '#validators/match'
import { HttpContext } from '@adonisjs/core/http'

export default class MatchesController {
  show() {}
  async store({ request, response }: HttpContext) {
    const payload = await createMatchValidator.validate(request.body())

    return await Match.create({
      ...payload,
    }).then((match) => {
      response.created(match)
    })
  }
  async index({ request, response }: HttpContext) {
    return await indexCardValidator
      .validate(request.params())
      .then((idx) => Match.findByOrFail({ matchId: idx.id }))
      .catch(() => response.status(404))
  }
  async destroy({ request, response }: HttpContext) {
    return await indexCardValidator
      .validate(request.params())
      .then((idx) => Match.findByOrFail({ matchId: idx.id }))
      .then(async (card) => await card.delete().then(() => response.ok(card)))
      .catch(() => response.status(404))
  }
  update() {}
}
