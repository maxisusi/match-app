import Card from '#models/card'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

const card = await Card.findBy({ title: 'Hello world' }).then((c) => c?.cardId)

test.group('Card update', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('fails when id is not a UUID', async ({ client }) => {
    const response = await client.put(`api/cards/1122`)
    response.assertNotFound()
  })
  test('fails when id is not found', async ({ client }) => {
    const response = await client.put(`api/cards/${randomUUID()}`)
    response.assertNotFound()
  })

  test('fails when title is below 3 charachters', async ({ client }) => {
    const response = await client.put(`api/cards/${card}`).json({
      title: 'ab',
      description: 'Description for card 1',
    })
    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('fails when description is below 3 charachters', async ({ client }) => {
    const response = await client.put(`api/cards/${card}`).json({
      title: 'Card title',
      description: 'ab',
    })
    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('returns card when updated', async ({ client }) => {
    const response = await client.put(`api/cards/${card}`).json({
      title: 'Card title',
      description: 'Description for card 1'.repeat(10),
      status: 'public',
    })
    response.assertOk()
    response.assertBodyContains({
      title: 'Card title',
      description: 'Description for card 1'.repeat(10),
      status: 'public',
    })
  })
})
