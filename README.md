# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This header is for tools and services built by the Financial Times.

- [Markup](#markup)
	- [Title Section](#title-section)
	- [Primary navigation](#primary-navigation)
	- [Secondary navigation](#secondary-navigation)
	- [Themes](#themes)
	- [Bleed header](#bleed-header)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration](#migration)
- [Contact](#contact)
- [License](#license)

## Markup

An `o-header-services` header is divided into three main parts: title section, primary navigation and secondary navigation. In every case, this is the base of the variations in markup:

```html
<header class='o-header-services' data-o-component='o-header-services'>
	<!-- Markup specific to the needs of your product. Options detailed below. -->
</header>
```

### Title Section

A title section is **required** for every header, and every title section _must_ include a logo and a product title.
The logo will default to the FT logo—if you are not using the build service you can customise it with the `oHeaderServices()` [Sass mixin](#sass).

You can choose to include a product tagline to describe your product concisely, and there is space for extra content such as a 'Sign In' link in this section of the header, too.

_Note: If there is a 'Sign in' option, it should be consistent with other FT products by aligning itself to the right and avoiding different wording such as 'Log in' or 'Login'._

You can see an example of a title section-only header and the markup for it in the [Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-title-section).

### Primary Navigation

The primary navigation is an **optional** addition to the title section. It's most useful for high-level navigation.

This section of the header has specific behaviour, as it turns into a drawer at smaller viewport sizes (740px down). It requires the addition an extra element in the title section to support the hamburger button.

If you are using extra content (such as a 'Sign in' link), that will be pulled into the drawer, as well.

You can see an example of the primary navigation and its markup in the [Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-primary-navigation).

### Secondary Navigation

The secondary navigation is also an **optional** addition to the header, but it makes more sense alongside the primary navigation, as it serves more complicated products.

It includes two sections  of navigation, 'ancestors' and 'children'.
The 'ancestor' section  works in the form of a breadcrumb, and the children are relative to the ancestor.

At smaller viewports, it does _not_ collapse into the drawer, but becomes scrollable, instead.

You can see an example of the secondary navigation and its markup in the [Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-secondary-navigation).

### Themes

`o-header-services` offers theming for B2B or B2C products under FT.com. They are designed to affect the title section and the primary navigation.

To add a theme to the header, add the appropriate class to the header element. For example, for B2B that would be:

```diff
+<header class='o-header-services o-header-services--b2b' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
	<!-- Your header markup -->
</header>
```

You can see what B2B and B2C headers look like on the [Origami Registry](https://registry.origami.ft.com/components/o-header-services#demo-theme-b2c).

### Bleed Header
If your application requires a bleed header, you'll need to add the `o-header-services--bleed` variant to your header.
```diff
+<header class='o-header-services o-header-services--bleed' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
	<!-- Your header markup -->
</header>
```

## Sass

In order to output every type of `o-header-services` style, you'll need to include the following:
```scss
	@import 'o-header-services/main';

	@include oHeaderServices();
```

You can be more selective about which types you would like to output, by using an `$opts` map. It accepts the following lists:

**types**
- `'primary-nav'`
- `'secondary-nav'`
- `'bleed'`
- `'b2b'`
- `'b2c'`

**logo**
- the name of a logo from the [logos image set](https://registry.origami.ft.com/components/logo-images@1.8.0). Defaults to the FT logo.

If you are looking for specific `o-header-services` features you can request them in the following way:
```scss
	@import 'o-header-services/main';

	@include oHeaderServices($opts:
		'types': ('primary-nav', 'bleed');
		'logo': 'origami'
	);

	// Will output styles for a bleed header with a primary navigation and the Origami logo
```

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an `o-header-services` object or fire an `o.DOMContentLoaded` event, which `o-header-services` listens for.

You'll need to set up your header declaratively, as the JavaScript for `o-header-services` does _not_ construct it for you.

The JavaScript is responsible for generating the drawer and enabling scrolling on the secondary navigation. You can implement that with the following:

```js
const oHeaderServices = require('o-header-services');

oHeaderServices.init();
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-header-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
