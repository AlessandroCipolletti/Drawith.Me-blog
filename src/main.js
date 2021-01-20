import { initCanvas } from './canvas'


document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    init()
  }
}

const init = () => {
  const container = document.getElementById('canvasContainer')
  initCanvas(container)
}
