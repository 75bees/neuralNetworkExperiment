(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function getCell (world, x, y) {
  return world[x] && world[x][y]
}
module.exports = (state) => {
  const oldState = JSON.parse(JSON.stringify(state));

  state.world.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const neighbours = [
        getCell(oldState.world, rowIndex - 1, columnIndex - 1), 
        getCell(oldState.world, rowIndex - 1, columnIndex), 
        getCell(oldState.world, rowIndex - 1, columnIndex + 1),
        getCell(oldState.world, rowIndex, columnIndex - 1), 
        getCell(oldState.world, rowIndex, columnIndex + 1),
        getCell(oldState.world, rowIndex + 1, columnIndex - 1), 
        getCell(oldState.world, rowIndex + 1, columnIndex), 
        getCell(oldState.world, rowIndex + 1, columnIndex + 1)
      ].filter((cell) => cell).length;
      if (cell) {
        if (neighbours < 2 || neighbours > 3) {
          row[columnIndex] = null
        } 
      } else {
        if (neighbours === 3) {
          row[columnIndex] = {}
        }
      }
    })
  });

}

/* 
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
},{}],2:[function(require,module,exports){
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



},{"./conways.js":1,"./visualiser":3}],3:[function(require,module,exports){
module.exports = (window, worldSize) => {
  const output = window.document.createElement('div');
  output.classList.add('visualiser');

  function createWorld (size) { 
    for (var  rowIndex = 0;  rowIndex < size;  rowIndex++) {
      const row = window.document.createElement('div');
      output.appendChild(row);
      for (var columnIndex = 0; columnIndex < size; columnIndex++) {
        const cell = window.document.createElement('div');
        cell.classList.add('cell')
        row.appendChild(cell);
      }
    }
  }
  createWorld(worldSize);

  function render (state) {
    const rows = Array.from(output.querySelectorAll(':scope > div'));

    rows.forEach((row, rowIndex) => {
      Array.from(row.querySelectorAll(':scope > div')).forEach((cell, columnIndex) => {
        if (state.world[rowIndex][columnIndex]) {
          cell.classList.add('creature')
        } else {
          cell.classList.remove('creature')
        }
      });
    })
  }
    
  return {
    render,
    output
  }
};
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb253YXlzLmpzIiwiaW5kZXguanMiLCJ2aXN1YWxpc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJmdW5jdGlvbiBnZXRDZWxsICh3b3JsZCwgeCwgeSkge1xuICByZXR1cm4gd29ybGRbeF0gJiYgd29ybGRbeF1beV1cbn1cbm1vZHVsZS5leHBvcnRzID0gKHN0YXRlKSA9PiB7XG4gIGNvbnN0IG9sZFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdGF0ZSkpO1xuXG4gIHN0YXRlLndvcmxkLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY29sdW1uSW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG5laWdoYm91cnMgPSBbXG4gICAgICAgIGdldENlbGwob2xkU3RhdGUud29ybGQsIHJvd0luZGV4IC0gMSwgY29sdW1uSW5kZXggLSAxKSwgXG4gICAgICAgIGdldENlbGwob2xkU3RhdGUud29ybGQsIHJvd0luZGV4IC0gMSwgY29sdW1uSW5kZXgpLCBcbiAgICAgICAgZ2V0Q2VsbChvbGRTdGF0ZS53b3JsZCwgcm93SW5kZXggLSAxLCBjb2x1bW5JbmRleCArIDEpLFxuICAgICAgICBnZXRDZWxsKG9sZFN0YXRlLndvcmxkLCByb3dJbmRleCwgY29sdW1uSW5kZXggLSAxKSwgXG4gICAgICAgIGdldENlbGwob2xkU3RhdGUud29ybGQsIHJvd0luZGV4LCBjb2x1bW5JbmRleCArIDEpLFxuICAgICAgICBnZXRDZWxsKG9sZFN0YXRlLndvcmxkLCByb3dJbmRleCArIDEsIGNvbHVtbkluZGV4IC0gMSksIFxuICAgICAgICBnZXRDZWxsKG9sZFN0YXRlLndvcmxkLCByb3dJbmRleCArIDEsIGNvbHVtbkluZGV4KSwgXG4gICAgICAgIGdldENlbGwob2xkU3RhdGUud29ybGQsIHJvd0luZGV4ICsgMSwgY29sdW1uSW5kZXggKyAxKVxuICAgICAgXS5maWx0ZXIoKGNlbGwpID0+IGNlbGwpLmxlbmd0aDtcbiAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgIGlmIChuZWlnaGJvdXJzIDwgMiB8fCBuZWlnaGJvdXJzID4gMykge1xuICAgICAgICAgIHJvd1tjb2x1bW5JbmRleF0gPSBudWxsXG4gICAgICAgIH0gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobmVpZ2hib3VycyA9PT0gMykge1xuICAgICAgICAgIHJvd1tjb2x1bW5JbmRleF0gPSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSk7XG5cbn1cblxuLyogXG5BbnkgbGl2ZSBjZWxsIHdpdGggZmV3ZXIgdGhhbiB0d28gbGl2ZSBuZWlnaGJvdXJzIGRpZXMsIGFzIGlmIGJ5IHVuZGVycG9wdWxhdGlvbi5cbkFueSBsaXZlIGNlbGwgd2l0aCB0d28gb3IgdGhyZWUgbGl2ZSBuZWlnaGJvdXJzIGxpdmVzIG9uIHRvIHRoZSBuZXh0IGdlbmVyYXRpb24uXG5BbnkgbGl2ZSBjZWxsIHdpdGggbW9yZSB0aGFuIHRocmVlIGxpdmUgbmVpZ2hib3VycyBkaWVzLCBhcyBpZiBieSBvdmVycG9wdWxhdGlvbi5cbkFueSBkZWFkIGNlbGwgd2l0aCBleGFjdGx5IHRocmVlIGxpdmUgbmVpZ2hib3VycyBiZWNvbWVzIGEgbGl2ZSBjZWxsLCBhcyBpZiBieSByZXByb2R1Y3Rpb24uXG4qLyIsImNvbnN0IGNyZWF0ZVZpc3VhbGlzZXIgPSByZXF1aXJlKCcuL3Zpc3VhbGlzZXInKTtcbmNvbnN0IGNvbndheXMgPSByZXF1aXJlKCcuL2NvbndheXMuanMnKTtcbmNvbnN0IHdvcmxkU2l6ZSA9IDMwMDtcbmNvbnN0IHZpc3VhbGlzZXIgPSBjcmVhdGVWaXN1YWxpc2VyKHdpbmRvdywgd29ybGRTaXplKTtcbmNvbnN0IHN0YXRlID0ge1xuICB3b3JsZDogbmV3IEFycmF5KHdvcmxkU2l6ZSkuZmlsbChudWxsKS5tYXAoKCkgPT4ge1xuICAgIHJldHVybiBuZXcgQXJyYXkod29ybGRTaXplKS5maWxsKE1hdGgucmFuZG9tKCkgPiAwLjUgPyB7fSA6IG51bGwpXG4gIH0pXG59O1xuXG5zdGF0ZS53b3JsZFswXVsxXSA9IHt9O1xuc3RhdGUud29ybGRbMV1bMl0gPSB7fTtcbnN0YXRlLndvcmxkWzJdWzBdID0ge307XG5zdGF0ZS53b3JsZFsyXVsxXSA9IHt9O1xuc3RhdGUud29ybGRbMl1bMl0gPSB7fTtcblxubGV0IHBsYXlpbmcgPSBmYWxzZVxubGV0IG5leHRGblxuXG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbnBsYXlCdXR0b24udGV4dENvbnRlbnQgPSAnUGxheS9QYXVzZSdcblxucGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcGxheWluZyA9ICFwbGF5aW5nXG4gIGRlZmVyKG5leHRGbilcbn0pO1xuXG5jb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbm5leHRCdXR0b24udGV4dENvbnRlbnQgPSAnTmV4dCdcbm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGZuID0gbmV4dEZuXG4gIG5leHRGbiA9IG51bGxcbiAgZm4gJiYgZm4oKVxufSk7XG5cbmZ1bmN0aW9uIGRlZmVyIChmbikge1xuICBuZXh0Rm4gPSBmblxuICBwbGF5aW5nICYmIHNldFRpbWVvdXQoZm4sIDMyKVxufVxuXG5sZXQgZHJhZ2dpbmcgPSBmYWxzZVxudmlzdWFsaXNlci5vdXRwdXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50KSA9PiB7XG4gIGRyYWdnaW5nID0gdHJ1ZVxufSlcbnZpc3VhbGlzZXIub3V0cHV0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQpID0+IHtcbiAgZHJhZ2dpbmcgPSBmYWxzZVxufSlcbnZpc3VhbGlzZXIub3V0cHV0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgcmV0dXJuXG4gIH0gXG4gIGlmIChldmVudC50YXJnZXQubWF0Y2hlcygnLmNlbGwnKSkge1xuICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gQXJyYXkuZnJvbShldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5jaGlsZHJlbikuaW5kZXhPZihldmVudC50YXJnZXQpXG4gICAgY29uc3Qgcm93SW5kZXggPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pLmluZGV4T2YoZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQpXG5cbiAgICBpZiAoc3RhdGUud29ybGRbcm93SW5kZXhdW2NvbHVtbkluZGV4XSkge1xuICAgICAgc3RhdGUud29ybGRbcm93SW5kZXhdW2NvbHVtbkluZGV4XSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLndvcmxkW3Jvd0luZGV4XVtjb2x1bW5JbmRleF0gPSB7fTtcbiAgICB9XG4gIH1cbiAgdmlzdWFsaXNlci5yZW5kZXIoc3RhdGUpO1xufSlcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpc3VhbGlzZXIub3V0cHV0KTtcbiAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobmV4dEJ1dHRvbik7XG4gIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBsYXlCdXR0b24pO1xuXG5cbiAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICBjb253YXlzKHN0YXRlKTtcbiAgICB2aXN1YWxpc2VyLnJlbmRlcihzdGF0ZSk7XG4gICAgZGVmZXIocmVuZGVyKTtcbiAgfVxuICB2aXN1YWxpc2VyLnJlbmRlcihzdGF0ZSk7XG4gIGRlZmVyKHJlbmRlcik7XG59KVxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gKHdpbmRvdywgd29ybGRTaXplKSA9PiB7XG4gIGNvbnN0IG91dHB1dCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgb3V0cHV0LmNsYXNzTGlzdC5hZGQoJ3Zpc3VhbGlzZXInKTtcblxuICBmdW5jdGlvbiBjcmVhdGVXb3JsZCAoc2l6ZSkgeyBcbiAgICBmb3IgKHZhciAgcm93SW5kZXggPSAwOyAgcm93SW5kZXggPCBzaXplOyAgcm93SW5kZXgrKykge1xuICAgICAgY29uc3Qgcm93ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgb3V0cHV0LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICBmb3IgKHZhciBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgc2l6ZTsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKVxuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNyZWF0ZVdvcmxkKHdvcmxkU2l6ZSk7XG5cbiAgZnVuY3Rpb24gcmVuZGVyIChzdGF0ZSkge1xuICAgIGNvbnN0IHJvd3MgPSBBcnJheS5mcm9tKG91dHB1dC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiBkaXYnKSk7XG5cbiAgICByb3dzLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocm93LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IGRpdicpKS5mb3JFYWNoKChjZWxsLCBjb2x1bW5JbmRleCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUud29ybGRbcm93SW5kZXhdW2NvbHVtbkluZGV4XSkge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY3JlYXR1cmUnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnY3JlYXR1cmUnKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxuICB9XG4gICAgXG4gIHJldHVybiB7XG4gICAgcmVuZGVyLFxuICAgIG91dHB1dFxuICB9XG59OyJdfQ==
