import Match from '#models/match'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { randomUUID } from 'node:crypto'

const match = await Match.findBy({ name: 'Match card 1' }).then((m) => m?.matchId)

test.group('Match index', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  test('fails when id is not a UUID', async ({ client }) => {
    const response = await client.get(`api/matches/1122`)
    response.assertNotFound()
  })
  test('fails when id is not found', async ({ client }) => {
    const response = await client.get(`api/matches/${randomUUID()}`)
    response.assertNotFound()
  })

  test('returns a match when id is found', async ({ client }) => {
    const response = await client.get(`api/matches/${match}`)
    response.assertOk()
    response.assertBodyContains({
      name: 'Match card 1',
    })
  })
})
