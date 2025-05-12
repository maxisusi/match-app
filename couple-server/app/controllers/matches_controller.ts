import Match from '#models/match'
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
  index() {}
  destroy() {}
  update() {}
}
