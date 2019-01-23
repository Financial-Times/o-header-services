/* eslint-env mocha*/

import proclaim from 'proclaim';
import HeaderServices from '../../src/js/header';
import * as fixtures from '../helpers/fixtures';

describe('Header', () => {
	let headerEl;
	let primaryNav;

	beforeEach(() => {
		document.body.innerHTML = fixtures.withPrimaryNav;
		headerEl = document.body.querySelector('.o-header-services');
	});

	afterEach(() => {
		document.body.removeChild(headerEl);
		window.resizeTo(window.screen.availHeight, window.screen.availWidth);
	});

	describe('on viewports above 740px', () => {
		beforeEach(() => {
			new HeaderServices(headerEl);
			primaryNav = headerEl.querySelector('.o-header-services__primary-nav');
		});

		it('primary nav is visibile', () => {
			proclaim.isFalse(primaryNav.classList.contains('o-header-services__primary-nav--hidden'));
		});
	});

	describe('on viewports below 740px', () => {
		let click;

		beforeEach(() => {
			window.resizeTo(740, 740);
			new HeaderServices(headerEl);
			primaryNav = headerEl.querySelector('.o-header-services__primary-nav');
			click = element => headerEl.querySelector(element).dispatchEvent(new Event('click'));
		});

		it('primary nav is hidden', () => {
			setTimeout(() => {
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--hidden'));
				proclaim.isTrue(primaryNav.hasAttribute('aria-hidden', true));
			}, 100);
		});

		it('display primary nav on burger icon click', () => {
			let burgerIcon = '.o-header-services__hamburger-icon';
			setTimeout(() => {
				click(burgerIcon);
				proclaim.isFalse(primaryNav.classList.contains('o-header-services__primary-nav--hidden'));
			}, 100);
		});

		it('hides primary nav on second burger icon click', () => {
			let burgerIcon = '.o-header-services__hamburger-icon';

			setTimeout(() => {
				click(burgerIcon);
				click(burgerIcon);
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--hidden'));
			}, 100);
		});

		it('shifts related content to primary nav', () => {
			setTimeout(() => {
				let listItems = primaryNav.querySelectorAll('li');
				proclaim.equal(listItems.length, 6);
			}, 100);
		});
	});
});
