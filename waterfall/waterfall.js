{
	'use strict';

	function clearChildren() {
	for(const child of this.children)
		this.removeChild(child);
	}

	class WaterfallColumnElement extends HTMLElement {
		constructor() {
			super();
		}
	}

	function InitWaterfallView() {
		const elements = [...this.children];
		clearChildren.call(this);
		if(!(this.col > 0))
			this.col = 1;
		this.Rearrange(elements);
	}

	class WaterfallViewElement extends HTMLElement {
		constructor() {
			super();
			setTimeout(InitWaterfallView.bind(this));
		}

		get cols() {
			return [...this.getElementsByTagName('waterfall-col')];
		}

		get col() { return this.getAttribute('col'); }

		set col(value) {
			value = +value;
			if(isNaN(value))
				throw new TypeError('Waterfall column count must be set to a number');
			if(value == this.col)
				return value;
			this.setAttribute('col', value);
			this.Rearrange(this.cols.reduce(
				(all, col) => all.concat(col.elements), []
			));
			return value;
		}

		Append(element) {
			const target = this.cols.reduce(
				(res, col) => !res ? col :
					col.offsetHeight >= res.offsetHeight ?
						res : col,
				null
			);
			target.appendChild(element);
		}

		Rearrange(elements) {
			clearChildren.call(this);
			for(let i = 0; i < this.col; ++i) {
				const col = document.createElement('waterfall-col');
				this.appendChild(col);
			}
			for(const element of elements)
				this.Append(element);
		}
	}

	customElements.define('waterfall-view', WaterfallViewElement);
	customElements.define('waterfall-col', WaterfallColumnElement);
}
