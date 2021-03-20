export const createGrid = (size) => {
	const cells = Array((size * size)).fill(undefined).map((_, i) => i);
	const left = [1, cells.filter(cell => cell % size)];
	const top = cells.filter(cell => cell < size);
	const right = cells.filter(cell => (cell % (size - 1)) === 0);
	const bottom = cells.filter((cell, i) => i >= (cells.length - 1 - size));
	return {
		cells,
		borders: {
			left,
			top,
			right,
			bottom
		}
	};
};
