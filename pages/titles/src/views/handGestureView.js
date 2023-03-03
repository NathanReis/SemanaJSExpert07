export default class HandGestureView {
  #fingerLookupIndexes
  #styler
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')

  constructor({ fingerLookupIndexes, styler }) {
    this.#fingerLookupIndexes = fingerLookupIndexes
    this.#styler = styler
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight

    // Carrega os estilos assincronamente (evitar travar a tela enquanto carrega)
    setTimeout(() => this.#styler.loadDocumentStyles(), 200)
  }

  loop(fn) {
    requestAnimationFrame(fn)
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawResults(hands) {
    for (const { keypoints } of hands) {
      if (!keypoints) continue

      this.#canvasContext.fillStyle = 'gold'
      this.#canvasContext.strokeStyle = 'white'
      this.#canvasContext.lineWidth = 8
      this.#canvasContext.lineJoin = 'round'

      this.#drawJoients(keypoints)
      this.#drawFingersAndHoverElements(keypoints)
    }
  }

  #drawJoients(keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath()

      const newX = x - 2
      const newY = y - 2
      const radius = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
      this.#canvasContext.fill()
    }
  }

  #drawFingersAndHoverElements(keypoints) {
    const fingers = Object.keys(this.#fingerLookupIndexes)

    for (const finger of fingers) {
      const points = this.#fingerLookupIndexes[finger].map(
        index => keypoints[index]
      )
      const [{ x, y }] = points

      const region = new Path2D()
      region.moveTo(x, y)

      for (const point of points) {
        region.lineTo(point.x, point.y)
      }

      this.#canvasContext.stroke(region)
      this.#hoverElements(finger, points)
    }
  }

  #hoverElements(finger, points) {
    if (finger !== 'indexFinger') return

    const tip = points.find(item => item.name === 'index_finger_tip')
    const element = document.elementFromPoint(tip.x, tip.y)

    if (!element) return

    this.#toggleHover(element)
    setTimeout(() => this.#toggleHover(element), 250)
  }

  #toggleHover(element) {
    this.#styler.toggleStyle(element, ':hover')
  }

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y)

    if (!element) return

    const rect = element.getBoundingClientRect()
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.right + y
    })

    element.dispatchEvent(event)
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth'
    })
  }

  currentScrollPosition() {
    return document.scrollingElement.scrollTop
  }

  pageMaxHeight() {
    return document.body.clientHeight
  }
}
