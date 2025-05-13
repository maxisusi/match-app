import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare cardId: string

  @beforeCreate()
  static async addUUID(card: Card) {
    card.cardId = crypto.randomUUID()
    card.status = 'private'
  }

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: 'private' | 'public'

  @column()
  declare userId: string

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
