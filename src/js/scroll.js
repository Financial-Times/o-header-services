import oViewport from 'o-viewport';

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

	let listWidth;
	let containerWidth;

	function checkCurrentPosition() {
		const currentSelection = list.querySelector('[aria-current]');
		containerWidth = list.clientWidth;

		if (currentSelection) {
			let currentSelectionEnd = currentSelection.getBoundingClientRect().right;

			//if the current selection is wider than the end of the list
			if (currentSelectionEnd > containerWidth) {
				// check by how much
				let diff = currentSelectionEnd - containerWidth;
				// if the difference is greater than half of the list, scroll to the end of the current selection.
				diff = (diff > containerWidth / 2) ? currentSelectionEnd : containerWidth / 2;

				list.scrollTo({ left: diff, top: 0, behaviour: 'smooth' });
			}
		}

		scrollable();
	}

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		listWidth = list.scrollWidth;

		buttons.forEach(button => {
			if (direction(button) === 'left') {
				button.disabled = list.scrollLeft === 0;
			} else {
				const remaining = listWidth > containerWidth ? listWidth - containerWidth - list.scrollLeft : 0;
				button.disabled = remaining <= 1;
			}
		});
	}

	function scroll(e) {
		let distance = 100;

		if (direction(e.currentTarget) === 'left') {
			distance = (list.scrollLeft > distance ? distance : list.scrollLeft) * -1;
		} else {
			const remaining = listWidth - containerWidth - list.scrollLeft;
			distance = remaining > distance ? distance : remaining;
		}

		list.scrollLeft = list.scrollLeft + distance;

		scrollable();
	}

	oViewport.listenTo(['scroll', 'resize']);
	oViewport.setThrottleInterval(100);

	list.addEventListener('oViewport.scroll', scrollable);
	window.addEventListener('oViewport.resize', scrollable);

	buttons.forEach(button => {
		button.onclick = scroll;
	});

	checkCurrentPosition();
}

export default { init };