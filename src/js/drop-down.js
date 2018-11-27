import oGrid from 'o-grid';
import * as oUtils from 'o-utils';

class DropDown {
	constructor(headerEl) {
		this.headerEl = headerEl;
		this.nav = headerEl.querySelector('.o-header-services__primary-nav');
		this.class = {
			dropdown: 'o-header-services__primary-nav--dropdown',
			open: 'o-header-services__primary-nav--open',
			hidden: 'o-header-services__primary-nav--hidden'
		};

		if (!this.nav) { return; }

		this.debouncedRender = oUtils.debounce(() => this.render(), 100);
		this.burger = this.headerEl.querySelector('.o-header-services__hamburger-icon');
		this.burger.addEventListener('click', this);
		window.addEventListener('resize', this);
		window.addEventListener('keydown', this);

		this.render();
	}


	handleEvent(e) {
		if (e.type === 'resize') {
			this.debouncedRender();
		} else if (e.type === 'keydown') {
			if (e.key === 'Escape' && !this.nav.classList.contains(this.class.hidden)) {
				this.toggleDropdown();
				this.burger.focus();
			}
		} else if (e.type === 'click') {
			this.toggleDropdown();
		}
	}

	render () {
		const enableDropdown = oGrid.getCurrentLayout() === 'default' || oGrid.getCurrentLayout() === 'S';

		if (enableDropdown) {
			this.nav.addEventListener('click', this);
		} else {
			this.nav.removeEventListener('click', this);
		}

		this._shiftRelatedContentList(enableDropdown);
		this.nav.classList.toggle(this.class.dropdown, enableDropdown);
		this.nav.classList.toggle(this.class.hidden, enableDropdown);
		this.nav.setAttribute('aria-hidden', enableDropdown);
	}

	toggleDropdown () {
		const toggle = this.nav.classList.contains(this.class.hidden);
		if (toggle) {
			this.nav.classList.remove(this.class.hidden);
			// display: none doesn't work with keyframes,
			// so the element needs to be rendered before animated on open
			setTimeout(() => this.nav.classList.add(this.class.open), 100);
			this._toggleAriaAttributes(toggle);
		} else {
			this.nav.classList.remove(this.class.open);
			// display: none doesn't work with keyframes,
			// so the element needs to be animated before hidden on close
			setTimeout(() => this.nav.classList.add(this.class.hidden), 100);
			this._toggleAriaAttributes(!toggle);
		}
	}

	_shiftRelatedContentList (shiftItems) {
		let relatedContent = Array.from(this.headerEl.querySelectorAll('.o-header-services__related-content-list-item'));

		if (!relatedContent) { return; }

		let relatedContentList = this.headerEl.querySelector('.o-header-services__related-content');
		let navList = this.nav.querySelector('.o-header-services__primary-nav-list');

		relatedContent.forEach(item => shiftItems ? navList.appendChild(item) : relatedContentList.appendChild(item));
	}

	_toggleAriaAttributes(expand) {
		this.nav.setAttribute('aria-hidden', !expand);
		this.nav.lastElementChild.setAttribute('aria-hidden', !expand);
		this.burger.setAttribute('aria-expanded', expand);
		if (expand) {
			this.burger.querySelector('span').innerText = 'Close primary navigation';
			this.nav.querySelector('.o-header-services__primary-nav-link').focus();
			this.nav.lastElementChild.addEventListener('focusout', this);
		} else {
			this.burger.querySelector('span').innerText = 'Open primary navigation';
			this.nav.lastElementChild.removeEventListener('focusout', this);
		}
	}
}

export default DropDown;
