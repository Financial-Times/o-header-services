import drawer from './drawer';
import scroll from './scroll';

class HeaderServices {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.headerEl = headerEl;

		drawer.init(this.headerEl);
		scroll.init(this.headerEl);
	}

	/**
	 * Initialise header component.
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
