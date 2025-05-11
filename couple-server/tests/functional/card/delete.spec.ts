import Card from '#models/card'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

const card = await Card.findBy({ title: 'Hello world' }).then((c) => c?.cardId)

test.group('Card delete', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('fails when id is not a UUID', async ({ client }) => {
    const response = await client.delete(`api/cards/1122`)
    response.assertNotFound()
  })
  test('fails when id is not found', async ({ client }) => {
    const response = await client.delete(`api/cards/${randomUUID()}`)
    response.assertNotFound()
  })

  test('returns card when deleted', async ({ client }) => {
    const response = await client.delete(`api/cards/${card}`)
    response.assertOk()
    response.assertBodyContains({
      title: 'Hello world',
    })
  })
})
