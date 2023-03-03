export default class CardsController {
  #service
  #view
  #itemsPerLine = 5

  constructor({ service, view }) {
    this.#service = service
    this.#view = view
  }

  static async initialize(deps) {
    const controller = new CardsController(deps)

    return controller.init()
  }

  async init() {
    await this.#loadDB()

    this.#view.configureOnSearchInput(
      this.#onSearchInput.bind(this)
    )

    this.#addCards('')
  }

  async #loadDB() {
    return this.#service.loadCards()
  }

  #onSearchInput(keyword) {
    this.#view.clearCards()

    this.#addCards(keyword)
  }

  #addCards(keyword) {
    const cards = this.#service.filterTitles(keyword)
    const totalCards = cards.length

    if (!totalCards) {
      this.#view.updateSearchTitleBarTotal(totalCards)

      return
    }

    this.#view.addCards(cards, this.#itemsPerLine)
  }
}
