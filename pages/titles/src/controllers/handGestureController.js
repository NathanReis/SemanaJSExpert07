import { prepareRunChecker } from '../../../../lib/shared/util.js'

const { shouldRun: clickShouldRun } = prepareRunChecker({ timerDelay: 500 })
const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 })

export default class HandGestureController {
  #service
  #view
  #camera

  constructor({ service, view, camera }) {
    this.#service = service
    this.#view = view
    this.#camera = camera
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps)

    return controller.init()
  }

  async init() {
    return this.#loop()
  }

  async #loop() {
    await this.#service.initializeDetector()
    await this.#estimateHands()

    this.#view.loop(this.#loop.bind(this))
  }

  async #estimateHands() {
    try {
      this.#view.clearCanvas()

      const hands = await this.#service.estimateHands(this.#camera.video)

      if (!hands?.length) return

      this.#view.drawResults(hands)

      for await (const { event, x, y } of this.#service.detectGestures(hands)) {
        this.#treatEvent(event, x, y)
      }
    } catch (error) {
      console.error('deu ruim**', error)
    }
  }

  #treatEvent(event, x, y) {
    if (event === 'click') {
      this.#treatClickEvent(x, y)
    } else if (event.includes('scroll')) {
      this.#treatScrollEvent(event)
    }
  }

  #treatClickEvent(x, y) {
    if (!clickShouldRun()) return

    this.#view.clickOnElement(x, y)
  }

  #treatScrollEvent(event) {
    if (!scrollShouldRun()) return

    this.#scrollPage(event)
  }

  #scrollPage(direction) {
    const pixelsPerScroll = 150
    let y = this.#view.currentScrollPosition()

    if (direction === 'scroll-down') {
      if ((y + pixelsPerScroll) > this.#view.pageMaxHeight()) {
        y = this.#view.pageMaxHeight()
      } else {
        y += pixelsPerScroll
      }
    } else {
      if ((y - pixelsPerScroll) < 0) {
        y = 0
      } else {
        y -= pixelsPerScroll
      }
    }

    this.#view.scrollPage(y)
  }
}
