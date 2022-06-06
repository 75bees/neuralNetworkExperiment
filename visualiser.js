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