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
