export class GraphNode {
	constructor(params) {
		this._vertex = params.vertex;
		this._edges = {};
		this._isLeft = false;
		this._isRight = false;
		this._isTop = false;
		this._isBottom = false;
		this._errorOutOfGraph = new Error('You try to get incorrect edge').name = 'OutOfGraphError';
	}

	setPlacementAttribute(place) {
		this[place] = true;
	}

	setEdge(side, node) {
		this._edges[side] = node;
	}

	getVertex() {
		return this._vertex;
	}

	getTopEdge() {
		if (this._isTop) {
			throw this._errorOutOfGraph;
		}
		return this._edges.top;
	}

	getLeftEdge() {
		if (this._isLeft) {
			throw this._errorOutOfGraph;
		}
		return this._edges.left;
	}

	getBottomEdge() {
		if (this._isBottom) {
			throw this._errorOutOfGraph;
		}
		return this._edges.bottom;
	}

	getRightEdge() {
		if (this._isRight) {
			throw this._errorOutOfGraph;
		}
		return this._edges.right;
	}

	isLeftNode() {
		return this._isLeft;
	}

	isRightNode() {
		return this._isRight;
	}

	isTopNode() {
		return this._isTop;
	}

	isBottomNode() {
		return this._isBottom;
	}

	isTopLeftNode() {
		return this.isTopNode() && this.isLeftNode();
	}

	isTopRightNode() {
		return this.isTopNode() && this.isRightNode();
	}

	isBottomLeftNode() {
		return this.isBottomNode() && this.isLeftNode();
	}

	isBottomRightNode() {
		return this.isBottomNode() && this.isRightNode();
	}
}
