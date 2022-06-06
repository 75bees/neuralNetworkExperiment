const createVisualiser = require('./visualiser');
const conways = require('./conways.js');
const worldSize = 300;
const visualiser = createVisualiser(window, worldSize);
const state = {
  world: new Array(worldSize).fill(null).map(() => {
    return new Array(worldSize).fill(Math.random() > 0.5 ? {} : null)
  })
};

state.world[0][1] = {};
state.world[1][2] = {};
state.world[2][0] = {};
state.world[2][1] = {};
state.world[2][2] = {};

let playing = false
let nextFn

const playButton = document.createElement('button')
playButton.textContent = 'Play/Pause'

playButton.addEventListener('click', () => {
  playing = !playing
  defer(nextFn)
});

const nextButton = document.createElement('button')
nextButton.textContent = 'Next'
nextButton.addEventListener('click', () => {
  const fn = nextFn
  nextFn = null
  fn && fn()
});

function defer (fn) {
  nextFn = fn
  playing && setTimeout(fn, 32)
}

let dragging = false
visualiser.output.addEventListener('mousedown', (event) => {
  dragging = true
})
visualiser.output.addEventListener('mouseup', (event) => {
  dragging = false
})
visualiser.output.addEventListener('mousemove', (event) => {
  if (!dragging) {
    return
  } 
  if (event.target.matches('.cell')) {
    const columnIndex = Array.from(event.target.parentElement.children).indexOf(event.target)
    const rowIndex = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement)

    if (state.world[rowIndex][columnIndex]) {
      state.world[rowIndex][columnIndex] = null;
    } else {
      state.world[rowIndex][columnIndex] = {};
    }
  }
  visualiser.render(state);
})

window.addEventListener('DOMContentLoaded', () => {
  window.document.body.appendChild(visualiser.output);
  window.document.body.appendChild(nextButton);
  window.document.body.appendChild(playButton);


  function render () {
    conways(state);
    visualiser.render(state);
    defer(render);
  }
  visualiser.render(state);
  defer(render);
})


