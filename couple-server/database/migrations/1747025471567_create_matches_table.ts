import { BaseSchema } from '@adonisjs/lucid/schema'
import { randomUUID } from 'node:crypto'

export default class extends BaseSchema {
  protected tableName = 'matches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('match_id').primary().defaultTo(randomUUID())

      table.string('name', 255).notNullable()

      table.uuid('user_id').notNullable()
      table.foreign('user_id').references('users.user_id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
