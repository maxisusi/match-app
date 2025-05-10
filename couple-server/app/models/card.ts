import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare cardId: string

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare status: 'private' | 'public'

  @column()
  declare userId: string
  // @hasOne(() => User)
  // declare userId: HasOne<typeof User>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
