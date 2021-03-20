import {last} from '../helpers/last';
import {createGrid} from '../helpers/createGrid';
import {GraphNode} from './GraphNode';

export class Graph {
	constructor(size) {
		const grid = createGrid(size);
		this._graph = this._createGraph(grid);
		this._currentVertex = this._graph[0];
	}

	_createGraph(grid) {
		const {cells, borders} = grid;
		const nodes = cells.map(cell => new GraphNode({vertex: cell}))
		return nodes.forEach((node) => {
			const vertex = node.getVertex();
			const graphEdgeSize = last(borders.top) - borders.top[0];
			const left = nodes[vertex - 1];
			const right = nodes[vertex + 1];
			const top = nodes[vertex - graphEdgeSize];
			const bottom = nodes[vertex + graphEdgeSize];
			const isLeft = borders.left.includes(vertex);
			const isRight = borders.left.includes(vertex);
			const isTop = borders.top.includes(vertex);
			const isBottom = borders.bottom.includes(vertex);
			const isTopLeft = isTop && isLeft;
			const isTopRight = isTop && isRight;
			const isBottomLeft = isBottom && isLeft;
			const isBottomRight = isBottom && isRight;

			if(isTopLeft) {
				node.setEdge('right', right);
				node.setEdge('bottom', bottom);
				node.setPlacementAttribute('isTop');
				node.setPlacementAttribute('isLeft');
				return;
			}
			if(isTopRight) {
				node.setEdge('left', left);
				node.setEdge('bottom', bottom);
				node.setPlacementAttribute('isTop');
				node.setPlacementAttribute('isRight');
				return;
			}
			if(isBottomLeft) {
				node.setEdge('top', top);
				node.setEdge('right', right);
				node.setPlacementAttribute('isBottom');
				node.setPlacementAttribute('isLeft');
				return;
			}
			if(isBottomRight) {
				node.setEdge('left', left);
				node.setEdge('top', top);
				node.setPlacementAttribute('isBottom');
				node.setPlacementAttribute('isRight');
				return;
			}
			if(isTop) {
				node.setEdge('left', left);
				node.setEdge('right', right);
				node.setEdge('bottom', bottom);
				node.setPlacementAttribute('isTop');
				return;
			}
			if(isRight) {
				node.setEdge('left', left);
				node.setEdge('bottom', bottom);
				node.setEdge('top', top);
				node.setPlacementAttribute('isRight');
				return;
			}
			if(isBottom) {
				node.setEdge('left', left);
				node.setEdge('top', top);
				node.setEdge('right', right);
				node.setPlacementAttribute('isBottom');
				return;
			}
			if(isLeft) {
				node.setEdge('top', top);
				node.setEdge('right', right);
				node.setEdge('bottom', bottom);
				node.setPlacementAttribute('isLeft');
			}
		})
	}

	moveToTop() {
		if(this._currentVertex.isTopNode()) {
			return;
		}
		this._currentVertex = this._currentVertex.getTopEdge();
	}

	moveToRight() {
		if(this._currentVertex.isRightNode()) {
			return;
		}
		this._currentVertex = this._currentVertex.getRightEdge();
	}

	moveToBottom() {
		if(this._currentVertex.isBottomNode()) {
			return;
		}
		this._currentVertex = this._currentVertex.getBottomEdge();
	}

	moveToLeft() {
		if(this._currentVertex.isLeftNode()) {
			return;
		}
		this._currentVertex = this._currentVertex.getLeftEdge();
	}

	moveToTopLeft() {
		if(this._currentVertex.isTopLeftNode()) {
			return;
		}
		this.moveToTop();
		this.moveToLeft();
	}

	moveToTopRight() {
		if(this._currentVertex.isTopRightNode()) {
			return;
		}
		this.moveToTop();
		this.moveToRight();
	}

	moveToBottomLeft() {
		if(this._currentVertex.isBottomLeftNode()) {
			return;
		}
		this.moveToBottom();
		this.moveToLeft();
	}

	moveToBottomRight() {
		if(this._currentVertex.isBottomRightNode()) {
			return;
		}
		this.moveToBottom();
		this.moveToRight();
	}

	getCurrentVertex() {
		return this._currentVertex;
	}

	setCurrentVertex(vertexNumber) {
		this._currentVertex = this._graph[vertexNumber];
	}
}
