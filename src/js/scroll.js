import * as oUtils from 'o-utils';

/**
 * Enable scrolling for navigation bars.
 * @param {HTMLElement} headerEl - The parent element of the scrollable nav
 */
function init(headerEl) {
	const container = headerEl.querySelector('[data-o-header-services-nav]');

	if (container === null) {
		return;
	}

	const buttons = Array.from(container.getElementsByTagName('button'));
	const list = container.querySelector('[data-o-header-services-nav-list]');

	let scrollWidth;
	let listWidth = list.clientWidth;

	function checkCurrentPosition() {
		const currentSelection = list.querySelector('[aria-current]');
		if (currentSelection) {
			let currentSelectionEnd = currentSelection.getBoundingClientRect().right;

			//if the current selection is wider than the end of the list
			if (currentSelectionEnd > listWidth) {
				// check by how much
				let diff = currentSelectionEnd - listWidth;
				// if the difference is greater than half of the list, scroll to the end of the current selection.
				diff = (diff > listWidth / 2) ? currentSelectionEnd : listWidth / 2;

				list.scrollTo(diff, 0);
			}
		}
		scrollable();
	}

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		scrollWidth = list.scrollWidth;

		buttons.forEach(button => {
			if (direction(button) === 'left') {
				button.disabled = list.scrollLeft === 0;
			} else {
				const remaining = scrollWidth - listWidth - list.scrollLeft;
				// Allow a little difference as scrollWidth is fast, not accurate.
				button.disabled = remaining <= 1;
			}
		});
	}

	function scroll(e) {
		let distance = 100;

		if (direction(e.currentTarget) === 'left') {
			distance = (list.scrollLeft > distance ? distance : list.scrollLeft) * -1;
		} else {
			const remaining = scrollWidth - listWidth - list.scrollLeft;
			distance = remaining > distance ? distance : remaining;
		}

		list.scrollLeft = list.scrollLeft + distance;

		scrollable();
	}

	list.addEventListener('scroll', oUtils.throttle(scrollable, 100));

	buttons.forEach(button => {
		button.onclick = scroll;
	});

	checkCurrentPosition();
}

export default { init };
