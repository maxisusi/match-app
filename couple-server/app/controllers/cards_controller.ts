import { createCardValidator } from '#validators/card'
import type { HttpContext } from '@adonisjs/core/http'

export default class CardsController {
  async store({ request }: HttpContext) {
    const payload = await createCardValidator.validate(request.body())
    return payload
  }
  index() {}
  show() {}
  update() {}
  destroy() {}
}
