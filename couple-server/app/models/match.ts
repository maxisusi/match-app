import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import { randomUUID } from 'node:crypto'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  declare matchId: string

  @beforeCreate()
  static async addUUID(match: Match) {
    match.matchId = randomUUID()
  }

  @column()
  declare name: string

  @column()
  declare userId: string

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
