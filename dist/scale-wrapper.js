import {ScaleCore} from "scale-core"
import {matrixRenderer} from "matrix-renderer"

// https://stackoverflow.com/questions/6942785/window-innerwidth-vs-document-documentelement-clientwidth
// https://bugzilla.mozilla.org/show_bug.cgi?id=156388#c14
function getViewportHeight() {
  return window.innerHeight && document.documentElement.clientHeight ?
    Math.min(window.innerHeight, document.documentElement.clientHeight) :
    window.innerHeight || document.documentElement.clientHeight
      || (document.querySelector('body') || document.getElementsByTagName('body')[0].clientHeight);
}

function getViewportWidth() {
  return window.innerWidth && document.documentElement.clientWidth ?
    Math.min(window.innerWidth, document.documentElement.clientWidth) :
    window.innerWidth || document.documentElement.clientWidth
      || (document.querySelector('body') || document.getElementsByTagName('body')[0].clientWidth);
}

function getViewportDims() {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  }
}

function TouchScaler(el) {
  this.el = el
  this.core = new ScaleCore()

  // initialize appropriate element's css properties
  matrixRenderer.setMatrix(this.el, {x: 1, y: 1}, {x: 0, y: 0})
  // matrixRenderer.setOrigin(this.el, {x: 0, y: 0})

  const elMatrix = matrixRenderer.getMatrix(this.el)
  const elOrigin = matrixRenderer.getOrigin(this.el)

  this.transforms = {
    translate: elMatrix.translate,
    scale: elMatrix.scale,
    origin: elOrigin
  }

}

TouchScaler.prototype.scaleStart = function(pinch) {
  const rects = matrixRenderer.getRects(this.el)

  const calculation = this.core.calculateStart(pinch, this.transforms.scale, this.transforms.translate, rects)
  this.transforms.origin = calculation.origin
  this.transforms.translate = calculation.translate

  matrixRenderer.setOrigin(this.el, this.transforms.origin)
  matrixRenderer.setMatrix(this.el, this.transforms.scale, this.transforms.translate)

  this.rAfStart()
}

TouchScaler.prototype.scaleMove = function(pinch) {
  const calculated = this.core.calculateMove(pinch)

  this.transforms.translate = calculated.translate
  this.transforms.scale = calculated.scale

}

TouchScaler.prototype.scaleStop = function(pinch) {

  window.cancelAnimationFrame(this.rAfId)

  const rects = matrixRenderer.getRects(this.el)
  const calculated = this.core.calculateStop(pinch, this.transforms.origin, this.transforms.scale, this.transforms.translate, rects)

  this.transforms.translate = calculated.translate
  this.transforms.scale = calculated.scale

  matrixRenderer.setMatrix(this.el, this.transforms.scale, this.transforms.translate)

  // const rects = getRects(this.el)
  // const vprtDims = getViewportDims()
  //
  // const bounded = this.core.encounterBounds(this.transforms.translate, rects, vprtHeight)
  // if (bounded.translate.x != this.transforms.translate.x || bounded.translate.y != this.transforms.translate.y) {
  //   // tween the element inside the container
  // }
}

TouchScaler.prototype.rAfStart = function() {
  this.rAfId = window.requestAnimationFrame(() => {

    this.renderFrame()
    this.rAfId = this.rAfStart()
  })
}

TouchScaler.prototype.renderFrame = function() {
  matrixRenderer.setMatrix(this.el, this.transforms.scale, this.transforms.translate)
}


export {TouchScaler}
