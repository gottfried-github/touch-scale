# Touch Scale
Scale elements with your fingers.

## Usage
**Note:** This is still very early version, rather a prototype.

```javascript
const el = document.querySelector('#my-scalable-el')
const scaler = new TouchScale(el)

hammer.on("pinchstart", (ev) => {
  scaler.scaleStart(ev)
})

hammer.on("pinchmove", (ev) => {
  scaler.scaleMove(ev)
})

hammer.on("pinchend", (ev) => {
  scaler.scaleStop(ev)
})
```
