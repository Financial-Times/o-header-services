/**
 * Enable scrolling for navigation bars.
 * @param {HTMLElement} headerEl - The parent element of the scrollable nav
 */
function init(headerEl) {
	const container = headerEl.querySelector('[data-o-header-services-nav]');

	if (container === null) {
		return;
	}

	const list = container.querySelector('[data-o-header-services-nav-list]');
	const buttons = Array.from(container.getElementsByTagName('button'), button => {
		button.addEventListener('click', scroll);
		return button;
	});

	let listWidth;
	let containerWidth;

	function checkCurrentPosition() {
		const currentSelection = list.querySelector('[aria-current]');

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

		toggleScrollButtons();
	}

	function toggleScrollButtons() {
		listWidth = list.scrollWidth;
		containerWidth = list.clientWidth;

		buttons.forEach(button => {
			if (button.className.match('left')) {
				button.disabled = list.scrollLeft === 0;
			} else {
				const remaining = listWidth > containerWidth ? listWidth - containerWidth - list.scrollLeft : 0;
				button.disabled = remaining <= 1;
			}
		});
	}

	function scroll(e) {
		let distance = 100;

		if (e.currentTarget.className.match('left')) {
			distance = (list.scrollLeft > distance ? distance : list.scrollLeft) * -1;
		} else {
			const remaining = listWidth - containerWidth - list.scrollLeft;
			distance = remaining > distance ? distance : remaining;
		}

		list.scrollLeft = list.scrollLeft + distance;

		toggleScrollButtons();
	}

	list.addEventListener('scroll', toggleScrollButtons);
	window.addEventListener('resize', toggleScrollButtons);


	checkCurrentPosition();
}

export default { init };
