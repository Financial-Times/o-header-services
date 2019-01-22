/* eslint-env mocha*/

import proclaim from 'proclaim';
import HeaderServices from '../../src/js/header';
import * as fixtures from '../helpers/fixtures';

describe('Dropdown', () => {
	let headerEl;
	let navItems;
	let attribute;

	beforeEach(() => {
		document.body.innerHTML = fixtures.withPrimaryNav;
		headerEl = document.body.querySelector('.o-header-services');
	});

	afterEach(() => {
		document.body.removeChild(headerEl);
		headerEl = null;
	});

	describe('toggles drop down menu via `aria-expanded`', () => {
		let click;

		beforeEach(() => {
			new HeaderServices(headerEl);
			navItems = document.querySelectorAll('li[data-o-header-services-level="1"]');
			click = (parent, element) => parent.querySelector(element).dispatchEvent(new Event('click'));
		});

		it('open on click', () => {
			click(navItems[0], 'a');
			attribute = navItems[0].getAttribute('aria-expanded') === 'true';
			proclaim.isTrue(attribute);
		});

		it('hides on double click', () => {
			click(navItems[0], 'a');
			click(navItems[0], 'a');
			attribute = navItems[0].getAttribute('aria-expanded') === 'false';
			proclaim.isTrue(attribute);
		});

		it('hides open dropdowns when different nav item is toggled', () => {
			click(navItems[0], 'a');
			attribute = navItems[0].getAttribute('aria-expanded') === 'true';
			proclaim.isTrue(attribute);
			click(navItems[1], 'a');
			attribute = navItems[0].getAttribute('aria-expanded') === 'false';
			proclaim.isTrue(attribute);
			attribute = navItems[1].getAttribute('aria-expanded') === 'true';
			proclaim.isTrue(attribute);
		});

		it('hides all menus if click outside of nav items', () => {
			click(navItems[0], 'a');
			attribute = navItems[0].getAttribute('aria-expanded') === 'true';
			proclaim.isTrue(attribute);
			click(document, 'body');
			attribute = navItems[0].getAttribute('aria-expanded') === 'false';
			proclaim.isTrue(attribute);
		})
	});
});
