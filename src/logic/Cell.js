export class Cell {
	constructor(cellNumber) {
		this._controlledBy = '';
		this._cellNumber = cellNumber;
	}

	takeByControl(value) {
		this._controlledBy = value;
	}

	getCellNumber() {
		return this._cellNumber;
	}

	getControllingPlayer() {
		return this._controlledBy;
	}

	isControlled() {
		return Boolean(this._controlledBy);
	}
}
