import oGrid from 'o-grid';
import * as oUtils from 'o-utils';

class Drawer {
	constructor(headerEl) {
		this.headerEl = headerEl;
		this.nav = headerEl.querySelector('.o-header-services__primary-nav');
		this.class = {
			drawer: 'o-header-services__primary-nav--drawer',
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
		} else if (e.type === 'click' || e.type === 'focusout') {
			this.toggleDropdown();
		}
	}

	render () {
		const enableDrawer = oGrid.getCurrentLayout() === 'default' || oGrid.getCurrentLayout() === 'S';

		if (enableDrawer) {
			this.nav.addEventListener('click', this);
		} else {
			this.nav.removeEventListener('click', this);
		}

		this._shiftRelatedContentList(enableDrawer);
		this.nav.classList.toggle(this.class.drawer, enableDrawer);
		this.nav.classList.toggle(this.class.hidden, enableDrawer);
		this.nav.setAttribute('aria-hidden', enableDrawer);
	}

	toggleDropdown () {
		const toggle = this.nav.classList.contains(this.class.hidden);
		if (toggle) {
			this.nav.classList.remove(this.class.hidden);
			this.burger.classList.add('o-header-services__hambuger--open');
			// display: none doesn't work with keyframes,
			// so the element needs to be rendered before animated on open
			setTimeout(() => this.nav.classList.add(this.class.open), 100);
			this._toggleAriaAttributes(toggle);
		} else {
			this.nav.classList.remove(this.class.open);
			this.burger.classList.remove('o-header-services__hambuger--open');
			// display: none doesn't work with keyframes,
			// so the element needs to be animated before hidden on close
			setTimeout(() => this.nav.classList.add(this.class.hidden), 100);
			this._toggleAriaAttributes(!toggle);
		}
	}

	_shiftRelatedContentList (shiftItems) {
		let relatedContent = this.headerEl.querySelector('.o-header-services__related-content');

		if (!relatedContent) { return; }

		let headerTop = this.headerEl.querySelector('.o-header-services__top');
		let navList = this.nav.querySelector('.o-header-services__primary-nav-list');

		return shiftItems ? navList.appendChild(relatedContent) : headerTop.appendChild(relatedContent);
	}

	_toggleAriaAttributes(expand) {
		this.nav.setAttribute('aria-hidden', !expand);
		this.nav.lastElementChild.setAttribute('aria-hidden', !expand);
		this.burger.setAttribute('aria-expanded', expand);
		if (expand) {
			this.burger.querySelector('span').innerText = 'Close primary navigation';
			this.nav.querySelector('.o-header-services__primary-nav-list li a').focus();
			this.nav.lastElementChild.addEventListener('focusout', this);
		} else {
			this.burger.querySelector('span').innerText = 'Open primary navigation';
			this.nav.lastElementChild.removeEventListener('focusout', this);
		}
	}
}

export default Drawer;
