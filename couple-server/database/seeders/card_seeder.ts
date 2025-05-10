import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomUUID } from 'node:crypto'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'john@doe.com',
      fullName: 'John Doe',
      password: 'password',
      userId: randomUUID(),
    })
  }
}
