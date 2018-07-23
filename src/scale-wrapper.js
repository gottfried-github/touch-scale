import {Scale} from "scale"
// import {Renderer} from "renderer"

function WrapperConstr(el) {
  this.el = el
  this.core = new Scale()
  // this.renderer = new Renderer(el)
}

Wrapper.prototype.scaleStart = function(pinch) {
  const rects = getRects(el)

  const calculation = this.core.calculateStart(pinch, this.transforms, rects)
  this.transforms.origin = calculation.origin
  this.transforms.translate = calculation.translate

  setOrigin(this.el, this.transforms.origin)
  setMatrix(this.el, this.transforms.scale, this.transforms.translate)

  this.rAf()
}

Wrapper.prototype.scaleMove = function(pinch) {
  const calculated = this.core.calculateMove(pinch, this.transforms.scale, this.transforms.translate)

  this.transforms.translate = calculate.translate
  this.transforms.scale = calculate.scale
}

Wrapper.prototype.scaleStop = function(pinch) {
  window.cancelAnimationFrame(this.rAfId)

  const calculated = this.core.calculateStop(pinch, this.transforms.scale, this.transforms.translate)

  this.transforms.translate = calculated.translate
  this.transforms.scale = calculated.scale

  setMatrix(this.el, this.transforms.scale, this.transforms.translate)
  const rects = getRects(this.el)
  const vprtDims = getViewportDims()

  // const bounded = this.core.encounterBounds(this.transforms.translate, rects, vprtHeight)
  // if (bounded.translate.x != this.transforms.translate.x || bounded.translate.y != this.transforms.translate.y) {
  //   // tween the element inside the container
  // }
}

/**

*/
Wrapper.prototype.rAf = function() {
  this.rAfId = window.requestAnimationFrame(() => {
    // this.renderFrame()

    this.renderFrame()
    this.rAfId = this.rAf()
  })
}

/**

*/
Wrapper.prototype.renderFrame = function() {
  setMatrix(this.el, this.transforms.scale, this.transforms.translate)
}
