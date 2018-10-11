/**
 * Toggles display state for the drop down nav on viewports below 740px.
 * @param {HTMLElement} nav The DOM node to toggle
 * @access private
 */
function toggle (nav) {
	const hide = (state) => {
		nav.setAttribute('aria-hidden', state);
		nav.classList.toggle('o-header-services__toggle--closed');
		nav.classList.toggle('o-header-services__toggle--open');
	}

	if(nav.classList.contains('o-header-services__toggle--open')) {
		//display the nav before animating it
		hide(true);
		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => nav.style.display = 'none', 600)
		toggleTabbing(nav, false);
	} else {
		//display the nav before animating it
		nav.style.display = 'block';
		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => hide(false), 0)
		toggleTabbing(nav, true);
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

	if (window.innerWidth < 740) {
		nav.setAttribute('aria-hidden', 'true');
		nav.classList.add('o-header-services__toggle--closed');
		nav.addEventListener('click', () => toggle(nav));
	}

	let burger = headerEl.querySelector('.o-header-services__hamburger-icon');
	burger.addEventListener('click', () => toggle(nav));
}

export default { init };
