class DropDown {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.primaryNav = headerEl.querySelector('.o-header-services__primary-nav');

		this.navItems = [...headerEl.querySelectorAll('[data-o-header-services-level="1"]')];
		this.navItems.forEach(item => {
			item.querySelector('button').addEventListener('click', this);
		});

		document.body.addEventListener('click', this);
	}

	/**
	 * Event Handler
	 * @param {Object} event - The revent emitted by element/window interactions
	 */
	handleEvent(e) {
		if (e.type === 'click') {
			if (!e.target.parentNode.getAttribute('data-o-header-services-level')) {
				DropDown.collapseAll(this.navItems);
				return;
			}

			let target = e.target.closest('li');

			if (!DropDown.isExpanded(target)) {
				if (!this.isDrawer()) {
					DropDown.collapseAll(this.navItems);
				}
				DropDown.expand(target);
			} else {
				DropDown.collapse(target);
			}

			e.stopPropagation();
		} else if (e.type === 'resize') {
			DropDown.collapseAll(this.navItems);
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
	static isExpanded(item) {
		return item.getAttribute('aria-expanded') === 'true';
	}

	/**
	 * Expands closed nav menu
	 */
	static expand(item) {
		item.setAttribute('aria-expanded', true);
		item.setAttribute('aria-hidden', false);
		DropDown.position(item.lastElementChild);
	}

	/**
	 * Changes nav menu position relative to the window
	 */
	static position(item) {
		if (item.getBoundingClientRect().right > window.innerWidth) {
			item.classList.add('o-header-services__list--right');
		}
	}

	/**
	 * Collapses open nav menu
	 */
	static collapse(item) {
		item.setAttribute('aria-expanded', false);
		item.setAttribute('aria-hidden', true);
	}

	/**
	 * Collapses all open nav menus
	 */
	static collapseAll(items) {
		items.forEach(DropDown.collapse);
	}
}

export default DropDown;
