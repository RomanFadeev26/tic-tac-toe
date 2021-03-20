import {Graph} from './Graph';
import {Field} from './Field';

const FIRST_PLAYER = 'x';
const SECOND_PLAYER = 'o';

export class Game {
	constructor({
		sizeForWin,
		fieldSize
	}) {
		this._sizeForWin = sizeForWin;
		this._graph = new Graph(fieldSize);
		this._field = new Field(fieldSize);
		this._activePlayer = 'x';
		this._lastTurn = 0;
		this._isFinished = false;
	}

	_isFirstPlayer() {
		return this._activePlayer === FIRST_PLAYER;
	}

	_isSecondPlayer() {
		return this._activePlayer === SECOND_PLAYER;
	}

	changeTurn(){
		if (this._isFirstPlayer()) {
			this._activePlayer = SECOND_PLAYER;
		}
		if (this._isSecondPlayer()) {
			this._activePlayer = FIRST_PLAYER;
		}
	}

	getPlayer(){
		return this._activePlayer;
	}

	findTurn(cellNumber) {
		return this._field.getMarkedPlayerCells(this._activePlayer).find(cell => cell.getCellNumber() === cellNumber);
	}

	checkTurnsInLine(line, turns) {
		const firstTurnIndexInLine = line.indexOf(turns[0]);
		if(firstTurnIndexInLine === -1) {
			return false
		}
		const cuttedLine = line.slice(firstTurnIndexInLine, turns.length);
		return JSON.stringify(cuttedLine) === JSON.stringify(turns);
	}

	checkWin(){
		this._graph.setCurrentVertex(this._lastTurn);

		const playerTurns = this._field.getMarkedPlayerCells(this._activePlayer).map(cell => cell.getCellNumber()).sort();

		if(playerTurns.length < this._sizeForWin) {
			return false;
		}

		const horizontalLine = this.getHorizontalLine();
		const verticalLine = this.getVerticalLine();
		const leftDiagonal = this.getDiagonalLineFromLeft();
		const rightDiagonal = this.getDiagonalLineFromRight();

		this._isFinished = this.checkTurnsInLine(horizontalLine, playerTurns)
		|| this.checkTurnsInLine(verticalLine, playerTurns)
		|| this.checkTurnsInLine(leftDiagonal, playerTurns)
		|| this.checkTurnsInLine(rightDiagonal, playerTurns);
	}

	getHorizontalLine() {
		const graph = this._graph;

		const horizontal = [graph.getCurrentVertex().getVertex()];
		while (graph.getCurrentVertex().isLeftNode()) {
			graph.moveToLeft();
			horizontal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		while (graph.getCurrentVertex().isRightNode()) {
			graph.moveToRight();
			horizontal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		return horizontal.sort();
	}

	getVerticalLine() {
		const graph = this._graph;

		const vertical = [graph.getCurrentVertex().getVertex()];
		while (graph.getCurrentVertex().isTopNode()) {
			graph.moveToTop();
			vertical.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		while (graph.getCurrentVertex().isBottomNode()) {
			graph.moveToBottom();
			vertical.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		return vertical.sort();
	}

	getDiagonalLineFromLeft() {
		const graph = this._graph;

		const leftDiagonal = [graph.getCurrentVertex().getVertex()];
		while (graph.getCurrentVertex().isTopNode() || graph.getCurrentVertex().isLeftNode()) {
			graph.moveToTopLeft();
			leftDiagonal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		while (graph.getCurrentVertex().isBottomNode()) {
			graph.moveToBottomRight();
			leftDiagonal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		return leftDiagonal.sort();
	}

	getDiagonalLineFromRight() {
		const graph = this._graph;

		const rightDiagonal = [graph.getCurrentVertex().getVertex()];
		while (graph.getCurrentVertex().isTopNode() || graph.getCurrentVertex().isLeftNode()) {
			graph.moveToTopRight();
			rightDiagonal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		while (graph.getCurrentVertex().isBottomNode()) {
			graph.moveToBottomLeft();
			rightDiagonal.push(graph.getCurrentVertex().getVertex());
		}
		graph.setCurrentVertex(this._lastTurn);

		return rightDiagonal.sort();
	}

	makeTurn(cellNumber){
		this._field.markCell(this._activePlayer, cellNumber);
		this._lastTurn = cellNumber;
		this.checkWin();

		if (this._isFinished) {
			this.changeTurn();
		}
	}
}