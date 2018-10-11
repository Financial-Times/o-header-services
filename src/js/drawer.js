function init (headerEl, nav) {
	let burger = headerEl.querySelector('.o-header-services__hamburger-icon');

	burger.addEventListener('click', () => {
		toggle(nav)
	});

	nav.addEventListener('click', () => {
		toggle(nav);
	})
}

function toggle (nav) {
	if(nav.classList.contains('toggle--open')) {
		//display the nav before animating it
		nav.setAttribute('aria-hidden', true);
		nav.classList.toggle('toggle--closed');
		nav.classList.toggle('toggle--open');
		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => {
			nav.style.display = 'none';
		}, 600)
	} else {
		//display the nav before animating it
		nav.style.display = 'block';
		//give the DOM time to display the nav before animating it, or animations don't work.
		setTimeout(() => {
			nav.setAttribute('aria-hidden', false);
			nav.classList.toggle('toggle--closed');
			nav.classList.toggle('toggle--open');
		}, 0)
	}

}
// This function is to solve accessibility issue
// when o-header-drawer is closed => tabbing is disabled.
// when o-header-drawer is open => tabbing is enabled.
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


export default { init };
