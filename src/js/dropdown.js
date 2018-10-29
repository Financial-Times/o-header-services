import oViewport from 'o-viewport';

class DropDown  {
	constructor(headerEl) {
		this.headerEl = headerEl;
		this.nav = headerEl.querySelector('.o-header-services__primary-nav');
		this.class = {
			dropdown: 'o-header-services__primary-nav--dropdown',
			open: 'o-header-services__primary-nav--open',
			hidden: 'o-header-services__primary-nav--hidden'
		}

		if (!this.nav) {
			return
		}

		let burger = this.headerEl.querySelector('.o-header-services__hamburger-icon');
		burger.addEventListener('click', this.toggleNav.bind(this));

		oViewport.listenTo('resize');
		oViewport.setThrottleInterval('resize', 100);

		window.addEventListener('oViewport.resize', this.render.bind(this));

		this.render.bind(this);
	}

	render () {
		if (window.innerWidth < 740) {
			this._shiftRelatedContentList(true);
			this.nav.classList.add(this.class.dropdown, this.class.hidden);
			this.nav.setAttribute('aria-hidden', true);
			this.nav.addEventListener('click', this.toggleNav);
		} else {
			this._shiftRelatedContentList(false);
			this.nav.classList.remove(this.class.dropdown, this.class.hidden);
			this.nav.addEventListener('click', this.toggleNav);
		}
	}

	toggleNav () {
		if (this.nav.classList.contains(this.class.hidden)) {
			this._swapClasses(this.class.hidden, this.class.open, true);
		} else {
			this._swapClasses(this.class.open, this.class.hidden, false);
		}
	}

	_shiftRelatedContentList (shiftItems) {
		let relatedContent = Array.from(this.headerEl.querySelectorAll('.o-header-services__related-content-list-item'));

		if (!relatedContent) {
			return;
		}

		let relatedContentList = this.headerEl.querySelector('.o-header-services__related-content');
		let navList = this.nav.querySelector('.o-header-services__nav-list');

		relatedContent.forEach(item => shiftItems ? navList.appendChild(item) : relatedContentList.appendChild(item))
	}

	_swapClasses (existingClass, newClass, tabbing) {
		this.nav.classList.remove(existingClass);
		// display: none doesn't work with keyframes, so the element needs to be
		// rendered before animated on open and animated before hidden on close
		setTimeout(() => this.nav.classList.add(newClass), 100);
		this._toggleNavTabbing(tabbing);
	}


	_toggleNavTabbing (isEnabled) {
		const allFocusable = Array.from(this.nav.querySelectorAll('a, button, input, select'));
		allFocusable.forEach(el => isEnabled ? el.removeAttribute('tabindex'): el.setAttribute('tabindex', '-1'));
	}
}

export default DropDown;
