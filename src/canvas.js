const myImg = new Image()
myImg.src = 'https://cdn.pixabay.com/photo/2017/05/13/23/05/img-src-x-2310895_960_720.png'

const defaultToolSize = 20
const sizeForceFactor = 2
const sizeSpeedFactor = 3
const speedFactorLengthUnit = 200
const currentToolColor = 'rgb(255, 0, 0)'

export const initCanvas = (container) => {
  // canvas creation
  const myCanvas = document.createElement('canvas')
  const ctx = myCanvas.getContext('2d')
  myCanvas.width = 400
  myCanvas.height = 250
  container.appendChild(myCanvas)

  // rect
  ctx.fillStyle = 'rgb(255, 0, 0)'
  ctx.fillRect(10, 10, 100, 80)

  // circle
  ctx.beginPath()
  ctx.fillStyle = 'rgb(0, 0, 255)'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.arc(200, 50, 40, 0, 2 * Math.PI, true)
  ctx.fill()

  // image
  ctx.drawImage(myImg, 280, 10, 80, 80)

  drawSquare(ctx, 50, 150, 0.5, 80, 'rgb(255, 0, 0)', 30)
  drawSquare(ctx, 110, 150, 0.7, 80, 'rgb(0, 255, 255)', -40)

  drawCircle(ctx, 200, 150, 0.9, 50, 'rgb(255, 0, 0)')
  drawCircle(ctx, 240, 150, 0.9, 60, 'rgb(255, 255, 0)')
  drawCircle(ctx, 270, 150, 0.9, 70, 'rgb(0, 255, 255)')

  drawImage(ctx, 350, 150, 0.6, 60, myImg, 45)

  myCanvas.classList.add('myCanvasClass')

  myCanvas.addEventListener('touchstart', handleTouch)
  myCanvas.addEventListener('touchmove', handleTouch)
}

let lastTouch = {
  x: -1,
  y: -1,
  force: 0,
}

// a bit of math
const round = (n, d = 0) => {
  const m = d ? Math.pow(10, d) : 1
  return Math.round(n * m) / m
}
const getDistanceBetweenTwoPoints = (x1, y1, x2, y2, decimals = 0) =>
  round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), decimals)

const handleTouch = (e) => {
  const x = e.touches[0].clientX - myCanvas.offsetLeft
  const y = e.touches[0].clientY - myCanvas.offsetTop
  const force = e.touches[0].force || 1
  const distance = lastTouch.x >= 0 ? getDistanceBetweenTwoPoints(lastTouch.x, lastTouch.y, x, y) : 0
  const size = defaultToolSize +
    (defaultToolSize * force) +
    (defaultToolSize * sizeSpeedFactor * Math.min(distance / speedFactorLengthUnit, 1))

  drawCircle(ctx, x, y, force, size, currentToolColor)
  lastTouch = { x, y, force }
}

const drawSquare = (destinationContext, x, y, alpha, size, color, rotation = 0) => {
  const halfSize = size / 2
  destinationContext.globalAlpha = alpha
  destinationContext.fillStyle = color
  if (rotation % 90) {
    destinationContext.translate(x, y)
    destinationContext.rotate(rotation)
    destinationContext.fillRect(-halfSize, -halfSize, size, size)
    destinationContext.rotate(-rotation)
    destinationContext.translate(-x, -y)
  } else {
    destinationContext.fillRect(x - halfSize, y - halfSize, size, size)
  }
}

const drawCircle = (destinationContext, x, y, alpha, size, color) => {
  destinationContext.beginPath()
  destinationContext.fillStyle = color
  destinationContext.globalAlpha = alpha
  destinationContext.lineJoin = 'round'
  destinationContext.lineCap = 'round'
  destinationContext.arc(x, y, size / 2, 0, 2 * Math.PI, true)
  destinationContext.fill()
}

const drawImage = (destinationContext, x, y, alpha, size, image, rotation = 0) => {
  const halfSize = size / 2
  destinationContext.globalAlpha = alpha
  if (rotation % 360) {
    destinationContext.translate(x, y)
    destinationContext.rotate(rotation)
    destinationContext.drawImage(image, -halfSize, -halfSize, size, size)
    destinationContext.rotate(-rotation)
    destinationContext.translate(-x, -y)
  } else {
    destinationContext.drawImage(image, Math.round(x - halfSize), Math.round(y - halfSize), size, size)
  }
}
