import Match from '#models/match'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    const user = await User.create({
      email: 'logan@doe.com',
      fullName: 'Logan Doe',
      password: 'password',
      userId: randomUUID(),
    })

    await Match.create({
      name: 'Match card 1',
      userId: user.userId,
      matchId: randomUUID(),
    })
  }
}
