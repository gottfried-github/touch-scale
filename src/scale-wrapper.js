import {ScaleCore} from "scale"
// import {renderer} from "renderer"
// import {domIo} from "domIo"

const core = new ScaleCore()

function Wrapper(el, options) {

  this.transforms = domIo.getTransforms(this.el)
  this.origin = domIo.getOrigin(this.el)
  // this.rects = domIo.getRects(this.el)
}

Wrapper.prototype.scaleStart = function(gesture) {
  // console.log("scaleStart, gesture: ", gesture)
  const coords = this.core.initializeMovement(gesture, this.transforms, this.rects, this.origin)
  // console.log("scaleStart, initMovement return", coords)

  this.transforms.translate = coords.translate
  this.origin = coords.origin

  return this
}

Wrapper.prototype.scaleMove = function(gesture) {
  // console.log("scaleMove, gesture: ", gesture)
  const calculated = this.core.calculateDiscretePoint(gesture, this.transforms)

  this.transforms.scale = calculated.scale
  this.transforms.translate = calculated.translate

  return this
  // this.domIo.setMatrix(this.el, this.transforms)
}

Wrapper.prototype.scaleStop = function(gesture) {
  // console.log("scaleStop, gesture: ", gesture)
  this.transforms = this.core.finishMovement(gesture, this.transforms, this.origin)

  const vprtDims = this.domIo.getViewportDims()

  // see, if el exceeds parent's area in an ugly way
  const translateBound = this.core.encounterBounds(this.transforms, this.rects, vprtDims)

  this.transforms.translate = translateBound

  return this
  // this.domIo.setMatrix(this.el, this.transforms)
  // this.rects = this.domIo.getRects(this.el)

  // if (
  //   transformsBounded.translateX != this.transforms.translateX
  //   || transformsBounded.translateY != this.transforms.translateY
  // ) {
  //   this.tweenIn()
  // }
}

Wrapper.prototype.updateTransformData = function(transforms, origin) {

  //
  this.transforms = Object.assign(this.transforms, transforms)
  this.origin = Object.assign(this.origin, origin)
}

function Scale(el, options) {
  this.el = el
  this.options = options || {}
  // this.scaleFactor = options.scaleFactor;
  // this.transitionClass = options.transitionClass || 'scalable-transition'

  // this.core = new ScaleCore()
  // this.domIo = new ScaleDomIo()

  // set the initial value of transform to matrix, in the element
  this.





  // console.log("scaler: ", this)
}

Scale.prototype.scaleStart = function(gesture) {
  // console.log("scaleStart, gesture: ", gesture)
  const coords = this.core.initializeMovement(gesture, this.transforms, this.rects, this.origin)
  // console.log("scaleStart, initMovement return", coords)

  this.transforms.translate = coords.translate
  this.origin = coords.origin

  this.domIo.setOrigin(this.el, this.origin)
  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleMove = function(gesture) {
  // console.log("scaleMove, gesture: ", gesture)
  const calculated = this.core.calculateDiscretePoint(gesture, this.transforms)

  this.transforms.scale = calculated.scale
  this.transforms.translate = calculated.translate

  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleStop = function(gesture) {
  // console.log("scaleStop, gesture: ", gesture)
  this.transforms = this.core.finishMovement(gesture, this.transforms, this.origin)

  const vprtDims = this.domIo.getViewportDims()

  // see, if el exceeds parent's area in an ugly way
  const translateBound = this.core.encounterBounds(this.transforms, this.rects, vprtDims)

  // this.transforms.translate = translateBound
  this.domIo.setMatrix(this.el, this.transforms)
  this.rects = this.domIo.getRects(this.el)

  // if (
  //   transformsBounded.translateX != this.transforms.translateX
  //   || transformsBounded.translateY != this.transforms.translateY
  // ) {
  //   this.tweenIn()
  // }
}

Scale.prototype.updateTransformData = function(transforms, origin) {

  //
  this.transforms = Object.assign(this.transforms, transforms)
  this.origin = Object.assign(this.origin, origin)
}
