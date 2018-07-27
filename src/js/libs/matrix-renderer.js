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
