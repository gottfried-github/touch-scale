# Touch Scale
Scale elements with your fingers.

## Usage
**Note:** This is still very early version, rather a prototype.

### initialize and subscribe:
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

Animation (**note** the specificity - the transition class is attached to the element selector):

```css
.my-scalable-element.my-transition-class {
  /*
  your transition code, e.g.:
  transition: transform 700ms ease-in;

  */
}
```
