const AUDIO_CONFIG = false
const VIDEO_CONFIG = {
  width: {
    min: 1280,
    // ideal: 1920,
    max: 2560,
  },
  height: {
    min: 720,
    // ideal: 1080,
    max: 1440,
  },
  frameRate: {
    ideal: 60
  }
}

export default class Camera {
  constructor() {
    this.video = document.createElement('video')
  }

  static async init() {
    if (this.checkAvailableMedia()) {
      throw new Error('Browser API navigator.mediaDevices.getUserMedia now available')
    }

    const videoConfig = {
      audio: AUDIO_CONFIG,
      video: VIDEO_CONFIG
    }

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig)

    const camera = new Camera()
    camera.video.srcObject = stream

    // this.debug(camera)

    await this.waitLoad(camera)

    camera.video.play()

    return camera
  }

  static checkAvailableMedia() {
    return (
      !navigator.mediaDevices
      || !navigator.mediaDevices.getUserMedia
    )
  }

  static debug(camera) {
    camera.video.height = 240
    camera.video.width = 320

    document.body.append(camera.video)
  }

  static async waitLoad(camera) {
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video)
      }
    })
  }
}
