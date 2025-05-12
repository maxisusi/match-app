/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CardsController = () => import('#controllers/cards_controller')
const MatchesController = () => import('#controllers/matches_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [CardsController, 'show'])
        router.get('/:id', [CardsController, 'index'])
        router.post('/', [CardsController, 'store'])
        router.put('/:id', [CardsController, 'update'])
        router.delete('/:id', [CardsController, 'destroy'])
      })
      .prefix('cards')

    router
      .group(() => {
        router.get('/', [MatchesController, 'show'])
        router.get('/:id', [MatchesController, 'index'])
        router.post('/', [MatchesController, 'store'])
        router.put('/:id', [MatchesController, 'update'])
        router.delete('/:id', [MatchesController, 'destroy'])
      })
      .prefix('matches')
  })
  .prefix('/api')
