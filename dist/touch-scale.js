import {ScaleCore} from "scale-core"
// import {matrixRenderer} from "matrix-renderer"

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

// a bunch of helper methods for interacting with dom
const matrixRenderer = {
  getOrigin: function(el) {
    const originData = window.getComputedStyle(el)['transform-origin'].split(' ')

    const origin = {
      x: parseInt(originData[0]),
      y: parseInt(originData[1])
    }

    return origin
  },

  getMatrix: function(el) {
    const transforms = {}
    const transformsData = el.style.transform.split('(')[1].split(')')[0].split(',');

    transforms.scale = {
      x: parseFloat(transformsData[0]),
      y: parseFloat(transformsData[3])
    }

    transforms.translate = {
      x: parseFloat(transformsData[4]),
      y: parseFloat(transformsData[5])
    }

    return transforms
  },

  getRects: function(el) {
    return el.getBoundingClientRect()
  },

  setMatrix: function(el, scale, translate) {
    // console.log('setMatrix', scale, translate)
    const matrixStr = 'matrix(' +
      scale.x + ', 0, 0, ' +
      scale.y + ', ' +
      translate.x + ', ' +
      translate.y +
      ')'

    this.doSetMatrix(el, matrixStr)
  },

  doSetMatrix: function(el, matrixStr) {
    el.style.transform = matrixStr
  },

  setOrigin: function(el, origin) {
    el.style.transformOrigin = origin.x+ "px "+ origin.y+ "px"
  },

  initializeElementsMatrix: function(el) {
    // set the initial value of transform to matrix;
    const matrixStr = 'matrix(1, 0, 0, 1, 0, 0)'
    this.doSetMatrix(el, matrixStr)
  },
}

/*
  Scale elements with a pinch

  * It has, as it's input, pinch events, that have to have `center` and `scale`.
  * It utilizes the [touch-scale_core](https://github.com/spti/scale-core) to calculate appropriate transforms of the element.
  * It stores the data about the transforms.
  * It implements `requestAnimationFrame` to animate rendering.
  * It uses a bunch of helper methods to render the transforms data onto the element.

  The `scaleMove` method's supposed to be called on `pinchmove` event (or analogous).
  It calculates the data and stores it. The running `requestAnimationFrame` picks the data up and renders it onto the element.
*/
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
