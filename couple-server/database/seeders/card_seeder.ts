import Card from '#models/card'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      email: 'daniel@doe.com',
      fullName: 'Daniel Doe',
      password: 'password',
    })

    await Card.create({
      description: 'Hello world, I am a card',
      title: 'Hello world',
      userId: user.userId,
    })
  }
}
