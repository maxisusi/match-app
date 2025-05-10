import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Card store', async (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  /** TESTING VALIDATION */
  test('fails when no title', async ({ client }) => {
    const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)

    const response = await client.post('api/cards').json({
      title: '',
      description: 'Description for card 1',
      userId,
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when no userId', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1',
      userId: '',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when userId is not a UUID', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1',
      userId: 'salutmec_123',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'uuid' }],
    })
  })

  test('fails when no description', async ({ client }) => {
    const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: '',
      userId,
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when title is below 3 character', async ({ client }) => {
    const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)
    const response = await client.post('api/cards').json({
      title: 'abc',
      description: 'Description for card 1',
      userId,
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('fails when description is below 100 words', async ({ client }) => {
    const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1',
      userId,
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  /** TESTING STORAGE */
  test('returns created card', async ({ client, assert }) => {
    const userId = await User.findBy({ fullName: 'John Doe' }).then((u) => u?.userId)
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1'.repeat(10),
      userId,
    })
    response.assertOk()
  })
})
