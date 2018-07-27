# Touch Scale
Scale elements with your fingers

## Usage
**Note:** This is a prototype

### initialize and subscribe

Let's suppose, we use the [hammerjs](https://hammerjs.github.io/) touch gestures library for pinch events

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

### styles

If you use sass, then, in your file:

```css
@import 'node_modules/touch-scale/dist/container';
@import 'node_modules/touch-scale/dist/element';

.my-container {
  @include container();

  /* my custom styles*/
}

.my-scalable-element {
  @include element();

  /* my custom styles*/
}
```

If you don't use sass, then add this to your container and element:

```css
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;

  /* my custom styles */  
}

.my-scalable-element {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;

  /* my custom styles */
}
```
