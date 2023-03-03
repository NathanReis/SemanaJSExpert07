import CardsController from './../controllers/cardsController.js'
import CardsService from './../services/cardsService.js'
import CardsView from './../views/cardsView.js'

const cardListWorker = new Worker('./src/workers/cardListWorker.js', { type: 'module' })
const [rootPath] = window.location.href.split('/pages/')
const factory = {
  async initialize() {
    return CardsController.initialize({
      service: new CardsService({
        dbUrl: `${rootPath}/assets/database.json`,
        cardListWorker
      }),
      view: new CardsView()
    })
  }
}

export default factory
