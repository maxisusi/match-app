import Match from '#models/match'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      email: 'logan@doe.com',
      fullName: 'Logan Doe',
      password: 'password',
    })

    await Match.create({
      name: 'Match card 1',
      userId: user.userId,
    })
  }
}
