class DropDown {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.headerEl = headerEl;

		this.primaryNav = Array.from(headerEl.querySelectorAll('[data-o-header-services-level="1"]'), item => {
			item.addEventListener('click', this);
			return item;
		});
	}

	handleEvent(e) {
		if (e.type === 'click') {
			e.preventDefault();
			let target = e.target.closest('li');
			this.toggleDropDown(target);
		}
	}

	toggleDropDown(target) {
		this.primaryNav.forEach(this.collapse);
		this.expand(target)
	}

	collapse(item) {
		item.setAttribute('aria-expanded', false)
	}

	expand(item) {
		item.setAttribute('aria-expanded', true)
	}
}

export default DropDown;
