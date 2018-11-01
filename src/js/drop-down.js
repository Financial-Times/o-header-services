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

		this.burger = this.headerEl.querySelector('.o-header-services__hamburger-icon');
		this.burger.addEventListener('click', this.toggleDropdown.bind(this));

		window.addEventListener('resize', oUtils.debounce(this.render.bind(this), 100));
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && !this.nav.classList.contains(this.class.hidden)) {
				this._dropNav(this.class.open, this.class.hidden, false);
			}
		});

		this.render();
	}

	render () {
		const enableDropdown = oGrid.getCurrentLayout() === 'default' || oGrid.getCurrentLayout() === 'S';

		if (enableDropdown) {
			this.nav.addEventListener('click', this.toggleDropdown.bind(this));
		} else {
			this.nav.removeEventListener('click', this.toggleDropdown);
		}

		this._shiftRelatedContentList(enableDropdown);
		this.nav.classList.toggle(this.class.dropdown, enableDropdown);
		this.nav.classList.toggle(this.class.hidden, enableDropdown);
		this.nav.setAttribute('aria-hidden', enableDropdown);
	}

	toggleDropdown () {
		if (this.nav.classList.contains(this.class.hidden)) {
			this._dropNav(this.class.hidden, this.class.open, true);
		} else {
			this._dropNav(this.class.open, this.class.hidden, false);
		}
	}

	_shiftRelatedContentList (shiftItems) {
		let relatedContent = Array.from(this.headerEl.querySelectorAll('.o-header-services__related-content-list-item'));

		if (!relatedContent) { return; }

		let relatedContentList = this.headerEl.querySelector('.o-header-services__related-content');
		let navList = this.nav.querySelector('.o-header-services__nav-list');

		relatedContent.forEach(item => shiftItems ? navList.appendChild(item) : relatedContentList.appendChild(item));
	}

	_dropNav (existingClass, newClass, expand) {
		this.nav.classList.remove(existingClass);
		// display: none doesn't work with keyframes, so the element needs to be
		// rendered before animated on open and animated before hidden on close
		setTimeout(() => this.nav.classList.add(newClass), 100);
		this._toggleAriaAttributes(expand);
	}

	_toggleAriaAttributes(expand) {
		this.nav.setAttribute('aria-hidden', !expand);
		this.nav.lastElementChild.setAttribute('aria-hidden', !expand);
		this.burger.setAttribute('aria-expanded', expand);
		if (expand) {
			this.burger.querySelector('span').innerText = 'Close primary navigation';
			this.nav.querySelector('.o-header-services__nav-link').focus();
			this.nav.lastElementChild.addEventListener('focusout', () => this._dropNav(this.class.open, this.class.hidden, false));
		} else {
			this.burger.querySelector('span').innerText = 'Open primary navigation';
			this.nav.lastElementChild.removeEventListener('focusout', this._dropNav);
		}
	}
}

export default DropDown;
