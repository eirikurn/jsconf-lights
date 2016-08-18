# Northern Lights Hackathon 

In this hackathon you'll get access to the northern lights of Harpa.
They consist of a series of lights that illuminate the walls of the
Nordurljos hall. Your goal is to create an epic light display for the
crowd of the Hacker Party.

In this editor you can develop and preview your light show.

# Usage

Write code on the left, preview on the right. Your code should register
an update function that is called 40 times per second and returns a
new Lights object.

The update function gets the current lights, a time value (counting
seconds from the start of your show) and a state object. It should
return a new Lights object.

The state object is empty at start but can be used to track state
across hot reloads.

# Global namespace

```javascript
class Lights {
    clone(): Lights
    get(column, row = 0)
    set(column, color)
    set(column, topColor, bottomColor)
}
```

```javascript
const config = {
  totalCols,
  leftCols,
  frontCols,
  rightCols,
  totalRows,
}
```

```javascript
// https://www.npmjs.com/package/color
const Color = require('color')
```
