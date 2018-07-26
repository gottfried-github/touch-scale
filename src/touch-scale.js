function TouchScale(el) {
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

TouchScale.prototype.scaleStart = function(pinch) {
  const rects = matrixRenderer.getRects(this.el)

  const calculation = this.core.calculateStart(pinch, this.transforms.scale, this.transforms.translate, rects)
  this.transforms.origin = calculation.origin
  this.transforms.translate = calculation.translate

  matrixRenderer.setOrigin(this.el, this.transforms.origin)
  matrixRenderer.setMatrix(this.el, this.transforms.scale, this.transforms.translate)

  this.rAfStart()
}

TouchScale.prototype.scaleMove = function(pinch) {
  const calculated = this.core.calculateMove(pinch)

  this.transforms.translate = calculated.translate
  this.transforms.scale = calculated.scale

}

TouchScale.prototype.scaleStop = function(pinch) {

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

TouchScale.prototype.rAfStart = function() {
  this.rAfId = window.requestAnimationFrame(() => {

    this.renderFrame()
    this.rAfId = this.rAfStart()
  })
}

TouchScale.prototype.renderFrame = function() {
  matrixRenderer.setMatrix(this.el, this.transforms.scale, this.transforms.translate)
}


export {TouchScale}
