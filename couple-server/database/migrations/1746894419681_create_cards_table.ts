import { BaseSchema } from '@adonisjs/lucid/schema'
import { randomUUID } from 'node:crypto'

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('card_id').primary().defaultTo(randomUUID())

      table.string('title').notNullable()
      table.string('description').notNullable()

      table.enum('status', ['private', 'public']).notNullable()

      table.uuid('user_id').notNullable()
      table.foreign('user_id').references('users.user_id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
