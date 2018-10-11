function init (headerEl, nav) {
	let burger = headerEl.querySelector('.o-header-services__hamburger-icon');
	burger.addEventListener('click', () => {
		nav.style.display = 'block';
		setTimeout(() => {
			nav.setAttribute('aria-hidden', 'false');
			nav.classList.toggle('toggle--open');
		}, 100)
	})
}

export default { init };
