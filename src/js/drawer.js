import oViewport from 'o-viewport';
/**
 * Toggles display state for the drop down nav on viewports below 740px.
 * @param {HTMLElement} nav The DOM node to toggle
 * @access private
 */
function toggle (nav) {
	if(nav.classList.contains('o-header-services__primary-nav--hidden')) {
		//display the nav before animating it
		nav.classList.toggle('o-header-services__primary-nav--hidden');

		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => nav.setAttribute('aria-hidden', false) , 100);
		toggleTabbing(nav, true);
	} else {
		//display the nav before animating it
		nav.setAttribute('aria-hidden', true);
		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => nav.classList.toggle('o-header-services__primary-nav--hidden'), 100);
		toggleTabbing(nav, false);
	}
}

/**
 * Toggles ability to tab depending on drop down menu visibility, primarily for accessibility
 * @param {HTMLElement} nav The DOM node to toggle
 * @param {Boolean} isEnabled Whether or not the drop down menu is visible and should be tab-able
 * @access private
 */

function toggleTabbing (nav, isEnabled) {
	const allFocusable = Array.from(nav.querySelectorAll('a, button, input, select'));
	if (isEnabled) {
		allFocusable.forEach(el => {
			el.removeAttribute('tabindex');
		});
	} else {
		allFocusable.forEach(el => {
			el.setAttribute('tabindex', '-1');
		});
	}
}

/**
 * Actions drop down behaviour for primary nav at small viewports (<740px)
 * @param {HTMLElement} headerEl The DOM node to toggle
 * @access public
 */
function init (headerEl) {
	let nav = headerEl.querySelector('.o-header-services__primary-nav');

	if (!nav) {
		return;
	}

	const checkViewport = () => {
		if (window.innerWidth < 740) {
			nav.classList.add('o-header-services__primary-nav--hidden');
			nav.setAttribute('aria-hidden', true);
			nav.addEventListener('click', () => toggle(nav));

			let burger = headerEl.querySelector('.o-header-services__hamburger-icon');
			burger.addEventListener('click', () => toggle(nav));
		} else {
			nav.classList.remove('o-header-services__primary-nav--hidden');
			nav.setAttribute('aria-hidden', false)
		}
	}

	oViewport.listenTo('resize');
	oViewport.setThrottleInterval('resize', 100);

	window.addEventListener('oViewport.resize', checkViewport);

	checkViewport();
}

export default { init };
