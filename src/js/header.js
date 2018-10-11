import drawer from './drawer'

class HeaderServices {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.headerEl = headerEl;

		let nav = headerEl.querySelector('.o-header-services__primary-nav');

		if (!nav) {
			return;
		}

		if (window.innerWidth < 740) {
			nav.setAttribute('aria-hidden', 'true');
			nav.classList.add('toggle--closed');
		}

		drawer.init(headerEl, nav);
	}

	/**
	 * Initialise message component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-header-services]')) {
			return new HeaderServices(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-header-services"]'), rootEl => new HeaderServices(rootEl, opts));
	}
}

export default HeaderServices;
