import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Card from '#models/card'
import { randomUUID } from 'node:crypto'

const card = await Card.findBy({ title: 'Hello world' }).then((c) => c?.cardId)

test.group('Card index', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('fails when id is not a UUID', async ({ client }) => {
    const response = await client.get(`api/cards/1122`)
    response.assertNotFound()
  })
  test('fails when id is not found', async ({ client }) => {
    const response = await client.get(`api/cards/${randomUUID()}`)
    response.assertNotFound()
  })

  test('returns a card when id is found', async ({ client }) => {
    const response = await client.get(`api/cards/${card}`)
    response.assertOk()
    response.assertBodyContains({
      title: 'Hello world',
    })
  })
})
