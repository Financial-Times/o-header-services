import oViewport from 'o-viewport';

/**
 * Moves related content list items between top section primary nav depening on viewport
 * @param {HTMLElement} headerEl The DOM node to interact with
 * @param {Boolean} shift whether to shift items to nav or back to top
 * @access private
 */
function shiftListItems(headerEl, shift) {
	let relatedItems = Array.from(headerEl.querySelectorAll('.o-header-services__related-content-list-item'));

	if (!relatedItems) {
		return;
	}

	let relatedContentList = headerEl.querySelector('.o-header-services__related-content');
	let navlist = headerEl.querySelector('.o-header-services__nav-list');

	if (shift) {
		relatedItems.forEach(item => navlist.appendChild(item));
	} else {
		relatedItems.forEach(item => relatedContentList.appendChild(item));
	}
}

/**
 * Toggles display state for the drop down nav on viewports below 740px.
 * @param {HTMLElement} nav The DOM node to toggle
 * @access private
 */
function toggle (nav) {
	nav.classList.toggle('o-header-services__primary-nav--hidden');
	setTimeout(() => nav.classList.toggle('o-header-services__primary-nav--open'), 50);
	nav.toggleAttribute('aria-hidden')
	nav.classList.contains('o-header-services__primary-nav--hidden') ? toggleTabbing(nav, false) : toggleTabbing(nav, true);
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

	let burger = headerEl.querySelector('.o-header-services__hamburger-icon');
	burger.addEventListener('click', () => toggle(nav));

	const checkViewport = () => {
		if (window.innerWidth < 740) {
			shiftListItems(headerEl, true);
			nav.classList.add('o-header-services__primary-nav--dropdown', 'o-header-services__primary-nav--hidden');
			nav.setAttribute('aria-hidden', true);
			nav.addEventListener('click', () => toggle(nav));
		} else {
			shiftListItems(headerEl, false);
			nav.classList.remove('o-header-services__primary-nav--dropdown', 'o-header-services__primary-nav--hidden');
			nav.setAttribute('aria-hidden', false);
			nav.removeEventListener('click', () => toggle(nav));
		}
	};

	oViewport.listenTo('resize');
	oViewport.setThrottleInterval('resize', 100);

	window.addEventListener('oViewport.resize', checkViewport);

	checkViewport();
}

export default { init };
