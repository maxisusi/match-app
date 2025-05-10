/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CardsController = () => import('#controllers/cards_controller')
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
  })
  .prefix('/api')
