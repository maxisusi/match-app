import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)

test.group('Match store', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('fails when no name is provied', async ({ client }) => {
    const response = await client.post('api/matches').json({
      name: '',
      userId: randomUUID(),
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when name is below 3 characters', async ({ client }) => {
    const response = await client.post('api/matches').json({
      name: 'ab',
      userId: randomUUID(),
    })
    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('fails when userId is not provied', async ({ client }) => {
    const response = await client.post('api/matches').json({
      name: 'Card name',
      userId: '',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when userId is not a UUID', async ({ client }) => {
    const response = await client.post('api/matches').json({
      name: 'Card name',
      userId: 'salutmec_123',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'uuid' }],
    })
  })

  test('responds with the created match', async ({ client }) => {
    const response = await client.post('api/matches').json({
      name: 'Card name',
      userId,
    })

    response.assertCreated()
    response.assertBodyContains({
      name: 'Card name',
      userId,
    })
  })
})
