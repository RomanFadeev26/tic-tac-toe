import {Cell} from './Cell';
import {createGrid} from '../helpers/createGrid';

export class Field {
	constructor(size) {
		this._cells = createGrid(size).cells.map((_, i) => new Cell(i));
	}

	markCell(value, cellNumber) {
		const cell = this._cells.find((_, i) => i === cellNumber);
		cell.takeByControl(value);
	}

	getMarkedPlayerCells(playerName) {
		return this._cells.filter(cell => cell.isControlled() && cell.getControllingPlayer() === playerName);
	}

	isAllCellsMarked() {
		return this._cells.every(cell => cell.isControlled());
	}
}
