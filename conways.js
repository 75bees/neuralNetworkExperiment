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