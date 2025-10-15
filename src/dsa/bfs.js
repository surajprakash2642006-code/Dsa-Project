export function bfs(start, goal, grid, width) {
  const queue = [[start]];
  const visited = new Set([`${start}`]);
  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    if (current === goal) {
      return path;
    }
    const directions = [-width, width, -1, 1];
    const neighbors = directions.map(dir => current + dir);
    for (const neighbor of neighbors) {
      if (current === 28 * 14 && neighbor === 28 * 14 - 1) {
      } else if (current === 28 * 14 + 27 && neighbor === 28 * 14 + 28) {
      }
      if (
        neighbor >= 0 &&
        neighbor < grid.length &&
        !visited.has(`${neighbor}`) &&
        grid[neighbor] !== 1 // Not a wall
      ) {
        visited.add(`${neighbor}`);
        const newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }
  return [];
}
  