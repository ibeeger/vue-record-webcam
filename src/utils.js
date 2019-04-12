/* global faceapi process */
/**
 * @param {*} video
 * @returns base64
 */
export const drawFace = function (video) {
  video = video || this.$refs.video
  let cs = document.getElementById('drawFaceCanvas');
  if (!cs) {
    cs = document.createElement('canvas')
    cs.id = 'drawFaceCanvas'
  }
  cs.width = 640
  cs.height = 360
  cs.getContext('2d').drawImage(video, 0, 0, cs.width, cs.height)
  return cs.toDataURL('image/jpeg', 0.7);
}

export const loadFaceJS = function () {
  return new Promise(function (resolve) {
    var po = document.createElement('script')
    po.type = 'text/javascript'
    po.async = true
    po.src = 'http://iassets.oss-cn-beijing.aliyuncs.com/libs/face-api.min.js'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(po, s)
    po.onload = resolve
  })
}

export const initFaceDetector = async function () {
  await faceapi.loadFaceLandmarkModel('http://iassets.oss-cn-beijing.aliyuncs.com/facemodel/')
  await faceapi.nets.tinyFaceDetector.load('http://iassets.oss-cn-beijing.aliyuncs.com/facemodel/')
  this.faceOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 256, scoreThreshold: 0.5 })
}

export const playFace = async function () {
  if (this.$refs.video.paused || this.$refs.video.ended) {
    setTimeout(() => this.playFace())
    return
  }
  const result = await faceapi.detectAllFaces(this.$refs.video, this.faceOptions).withFaceLandmarks()
  let con = result instanceof Array ? result : [result]
  if (result.length) {
    if (con.length >= 2) {
      this.$emit('faceCallback', {num: con.length})
    }
  } else {
    this.$emit('faceCallback', {num: 0})
  }
  setTimeout(() => this.playFace())
}
