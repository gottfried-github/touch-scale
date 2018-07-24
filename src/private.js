function getOrigin(el) {
  const originData = window.getComputedStyle(el)['transform-origin'].split(' ')

  const origin = {
    x: parseInt(originData[0]),
    y: parseInt(originData[1])
  }

  return origin
}

function getTransforms(el) {
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
}

function getRects(el) {
  return el.getBoundingClientRect()
}

function getViewportDims() {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  }
}

function setMatrix(el, scale, translate) {
  console.log('setMatrix', transforms)
  const matrixStr = 'matrix(' +
    scale.x + ', 0, 0, ' +
    scale.y + ', ' +
    translate.x + ', ' +
    translate.y +
    ')'

  this.doSetMatrix(el, matrixStr)
}

function doSetMatrix(el, matrixStr) {
  console.log('setMatrix', matrixStr)
  el.style.webkitTransform = matrixStr
  el.style.mozTransform = matrixStr
  el.style.msTransform = matrixStr
  el.style.oTransform = matrixStr
  el.style.transform = matrixStr
}

function setOrigin(el, origin) {
  el.style.transformOrigin = origin.x+ "px "+ origin.y+ "px"
}

function initializeElementsMatrix(el) {
  // set the initial value of transform to matrix;
  const matrixStr = 'matrix(1, 0, 0, 1, 0, 0)'
  this.doSetMatrix(el, matrixStr)
}
