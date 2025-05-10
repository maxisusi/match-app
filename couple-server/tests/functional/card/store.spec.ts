import { test } from '@japa/runner'

test.group('Card store', () => {
  test('fails when no title', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: '',
      description: 'Description for card 1',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when no description', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: '',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'required' }],
    })
  })

  test('fails when title is below 3 character', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: 'abc',
      description: 'Description for card 1',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('fails when description is below 100 words', async ({ client }) => {
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1',
    })

    response.assertUnprocessableEntity()
    response.assertBodyContains({
      errors: [{ rule: 'minLength' }],
    })
  })

  test('returns created card', async ({ client, assert }) => {
    const response = await client.post('api/cards').json({
      title: 'Card title',
      description: 'Description for card 1'.repeat(10),
    })
    response.assertOk()
  })
})
