class DropDown {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.primaryNav = window.n =headerEl.querySelector('.o-header-services__primary-nav');

		this.navItems = Array.from(headerEl.querySelectorAll('[data-o-header-services-level="1"]'), item => {
			item.addEventListener('click', this);
			return item;
		});
	}

	/**
	 * Event Handler
	 * @param {Object} event - The revent emitted by element/window interactions
	 */
	handleEvent(e) {
		if (e.type === 'click') {
			e.preventDefault();
			let target = e.target.closest('li');

			if (!this.isExpanded(target)) {
				if (!this.isDrawer()) {
					this.collapseAll();
				}
				this.expand(target);
			} else {
				this.collapse(target);
			}

			e.stopPropagation();
		} else if (e.type === 'resize') {
			collapseAll();
		}
	}

	/**
	 * Checks if primary nav is a drawer
	 * This boolean will change the drop down behaviour.
	 */
	isDrawer() {
		return this.primaryNav.classList.contains('o-header-services__primary-nav--drawer');
	}

	/**
	 * Checks whether nav menu is expanded
	 */
	isExpanded(item)  {
		return item.getAttribute('aria-expanded') === 'true';
	}

	/**
	 * Expands closed nav menu
	 */
	expand(item) {
		item.setAttribute('aria-expanded', true);
	}

	/**
	 * Collapses open nav menu
	 */
	collapse(item) {
		item.setAttribute('aria-expanded', false);
	}

	/**
	 * Collapses all open nav menus
	 */
	collapseAll() {
		this.navItems.forEach(this.collapse);
	}


}

export default DropDown;
