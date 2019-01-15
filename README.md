# o-header-services [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header-services) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This header is for tools and services built by the Financial Times.

## Index
- [Design](#design)
- [Markup](#markup)
	- [Title only header](#title-only-header)
	- [Themes](#themes)
	- [Related links and the drop down navigation](#related-links-and-the-drop-down-navigation)
		- [Core experience of the drop down navigation](#core-experience-of-the-drop-down-navigation)
	- [Primary navigation](#primary-navigation)
	- [Secondary navigation](#secondary-navigation)
	- [Bleed header](#bleed-header)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [License](#license)

## Design
`o-header-services` is a responsive header. It has support for up to three levels of navigation making it appropriate for single page applications and multi-layer applications.

It has themes for B2B and B2C products under FT.com. If you're building something and need a new theme, [please raise an issue](../../issues).

The header has the following features:

**Required**
- A product logo. This will default to the FT logo, but is customisable through a [Sass mixin](#mixins), meaning that this can only be changed if you are using the manual build process.
- The product title. This should be present and the same on all of your pages

**Optional**
- A product tagline. If used, this should be a concise description of your product. The tagline is only visible at the widest screen size
- At wide screen sizes, the right of the nav may be used for content like a "Sign in" link. At narrower screen widths this content goes behind a hamburger menu on the right of the FT logo
- If there is a "Sign in" option in the related content it should always appear on the far right. For consistency with other FT products, use "Sign in" over "Log in" or "Login"
- Primary navigation
- Secondary navigation


## Markup

### Title only header
The simplest header, appropriate for single page applications with no navigation is available with the following code:

```
<header class='o-header-services' data-o-component='o-header-services'>
	<div class='o-header-services__top'>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href='/'>Tool or Service name</a></h1>
			<span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
		</div>
	</div>
</header>
```

### Themes
`o-header-services` offers theming for B2B or B2C products under FT.com. To add a theme to the header, add the appropriate class to a wrapping element. For example, for b2b that would be:

```diff
+<header class='o-header-services o-header-services--b2b' data-o-component='o-header'>
-<header class='o-header-services' data-o-component='o-header'>
<!-- ... -->
```

### Related links and the drop down navigation

o-header-services supports related content (eg Sign in or licence numbers). At large screen widths these appear to the far right of the header.
At smaller screen widths this will be included in the drop down navigation.

#### Core experience of the drawer

Small screen users should still be able to access the contents of the drop down navigation even if their browser doesn't cut the mustard or the JavaScript has failed to load. This is not part of `o-header-services`, but we recommend you have the contents of the drop down navigation at the bottom of the page in a footer that is only visible if the body has a `.core` class. In core experience the hamburger menu should link to an anchor at the bottom of the page.

To add support for related content, add the following to your markup:

```diff
<header class='o-header-services' data-o-component='o-header'>
	<div class='o-header-services__top'>
+		<div class="o-header-services__hamburger">
+			<a class="o-header-services__hamburger-icon" href={{href}} role="button">
+				<span class="o-header-services__visually-hidden">Open primary navigation</span>
+			</a>
+		</div>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-subrand__product-tagline '>Tagline to explain the product here</span>
		</div>
+		<ul class="o-header-services__related-content">
+			<li>
+				<a href={{href}}>XXXX</a>
+			</li>
+			<li >
+				<a href={{href}}>Sign in</a>
+			</li>
+		</ul>
	</div>
</header>
```

### Primary navigation

If your application has more than one page you may want to add the primary navigation bar.
This requires the drawer code, as seen above, and the following addition:

```diff
<header class='o-header-services' data-o-component='o-header-services'>
	<div class='o-header-services__top'>
		<div class="o-header-services__hamburger">
			<a class="o-header-services__hamburger-icon" href={{href}} role="button">
				<span class="o-header-services__visually-hidden">Open primary navigation</span>
			</a>
		</div>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-services__product-tagline '>Tagline to explain the product here</span>
		</div>
		<ul class="o-header-services__related-content">
			<li>
				<a href={{href}}>XXXX</a>
			</li>
			<li>
				<a href={{href}}>Sign in</a>
			</li>
		</ul>
	</div>
</header>
+<nav class='o-header-services__primary-nav'>
+	<ul class='o-header-services__primary-nav-list'>
+	 <li>
+		 <a aria-current="true" href='#'>
+			 Nav item title
+		 </a>
+		</li>
+		<!-- more nav items -->
+	</ul>
+</nav>
```

### Secondary navigation

If your application is more complicated still, you may want to use a secondary navigation.
The secondary nav allows for breadcrumbs for many addition levels of navigation.

To use the secondary navigation, use the primary navigation and add the following code:

```diff
<header class='o-header-services' data-o-component='o-header-services'>
	<div class='o-header-services__top'>
		<div class="o-header-services__hamburger">
			<a class="o-header-services__hamburger-icon" href={{href}} role="button">
				<span class="o-header-services__visually-hidden">Open primary navigation</span>
			</a>
		</div>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1><span class='o-header-services__product-tagline '>Tagline to explain the product here</span>
		</div>
		<div class='o-header-services__related-content'>
			<a href='#'>XXXX</a>
			<a href='#'>Sign in</a>
		</div>
	</div>
</header>
<nav class='o-header-services__primary-nav' aria-label="primary">
 <ul class='o-header-services__primary-nav-list'>
	 <li aria-current="true">
		 <a href='#'>
			 Nav item title
		 </a>
		</li>
		<!-- more nav items -->
	</ul>
</nav>

+<nav class="o-header-services__secondary-nav" aria-label="secondary" data-o-header-services-nav>
+	<div class="o-header-services__secondary-nav-content" data-o-header-services-nav-list>
+		<ol class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--ancestors" aria-label="Ancestor section">
+			<li>
+				<a href={{href}}>
+					ancestor section
+				</a>
+			</li>
+			<li>
+				<a href={{href}}>
+					ancestor section
+				</a>
+			</li>
+			<li>
+				<a href={{href}} aria-current="true" aria-label="Current page">
+					current section
+				</a>
+			</li>
+		</ol>

+		<ul class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children" aria-label="Child sections">
+			<li>
+				<a href="{{href}}">
+					child page
+				</a>
+			</li>
+			<li>
+				<a href="{{href}}">
+					child page
+				</a>
+			</li>
+			<li>
+				<a href="{{href}}">
+					child page
+				</a>
+			</li>
+		</ul>
+	</div>
+		<button class="o-header-services__scroll-button o-header-services__scroll-button--left" title="scroll left" aria-hidden="true" disabled></button>
+		<button class="o-header-services__scroll-button o-header-services__scroll-button--right" title="scroll right" aria-hidden="true" disabled></button>
+</nav>

```

### Bleed Header
If your application requires a bleed header, you will need to add the `o-header-services--bleed` variant to your header.
For example, in the case of using both primary and secondary navigation:

```diff
-<header class='o-header-services' data-o-component='o-header'>
+<header class='o-header-services o-header-services--bleed' data-o-component='o-header'>
	<!-- header markup -->
</header>
	<!-- primary and secondary nav markup -->
```

## Sass

In order to output _every_ feature and variation of the `o-header-services` styles, use:
```scss
	@import 'o-header-services/main';

	@include oHeaderServices();
```

If you are looking for specific `o-header-services` features, such as a bleed header with a primary navigation bar, you can request it in the following way:
```scss
	@import 'o-header-services/main';

	@include oHeaderServices($opts: 'primary-nav', 'bleed');
```

The `oHeaderServices` mixin accepts two arguments. The first, `$opts`, is a list of features that you can select granularly for your project. If you don't provide a list, the mixin will output the styles for all features of the component. The second is `$logo`. The default logo for `o-header-services` is the FT logo. You can use any of the logos within the [logo-images](https://registry.origami.ft.com/components/logo-images) image set, by setting the logo's name to the variable:

```scss
@include oHeaderServices($opts: 'primary-nav', 'bleed', $logo: 'origami');
```

<!-- TABLE OF OPTS -->


## Migration guide

### Migrating from v2.x.x to v3.x.x

V2 introduces many new changes to o-header-services. It now uses the primary nav as a drawer menu on smaller viewports. It removes a large dependency on o-header, and changes multiple class names and markup.
It also removes most public mixins, and introduces a single public mixin, `oHeaderServices`;
<!-- private mixins here -->
The markup for a full header has changed in the following way:
```diff
-<header class="o-header-services" data-o-component="o-header">
+<header class='o-header-services' data-o-component='o-header-services'>
-	<div class="o-header-services__top o-header-services__container">
+	<div class="o-header-services__top">
	<div class="o-header-services__hamburger">
		<a class="o-header-services__hamburger-icon" href={{href}} role="button">
-				<span class="o-header__visually-hidden">Menu</span>
+				<span class="o-header-services__visually-hidden">Menu</span>
			</a>
		</div>
		<div class='o-header-services__logo'></div>
		<div class='o-header-services__title'>
			<h1 class='o-header-services__product-name'><a href=''>Tool or Service name</a></h1>
-				<span class='o-header-subrand__product-tagline'>Tagline to explain the product here</span>
+				<span class='o-header-services__product-tagline'>Tagline to explain the product here</span>
		</div>
-		<div class='o-header-services__related-content'>
-			<a href='#'>XXXX</a>
-			<a href='#'>Sign in</a>
-		</div>
+		<ul class="o-header-services__related-content">
+			<li>
+				<a href={{href}}>XXXX</a>
+			</li>
+			<li>
+				<a href={{href}}>Sign in</a>
+			</li>
+		</ul>
	</div>
</header>
<nav class="o-header-services__primary-nav">
-	<div class="o-header-services__container">
-		<ul class="o-header-services__nav-list">
+		<ul class="o-header-services__primary-nav-list">
-			<li class="o-header-services__nav-item">
+			<li>
-				<a class="o-header-services__nav-link o-header-services__nav-link--selected" href="#item-1">
+				<a aria-current="true" aria-label="Current page" href="#item-1">
					Nav item 1
				</a>
			</li>
			<!-- more nav items -->
		</ul>
-	</div>
</nav>

-<nav class="o-header-services__subnav" role="navigation" aria-label="Sub navigation">
+<nav class="o-header-services__secondary-nav" aria-label="secondary navigation"  data-o-header-services-nav>
-	<div class="o-header-services__container">
-		<div class="o-header__subnav-wrap-outside">
-			<div class="o-header__subnav-wrap-inside">
-				<div class="o-header-services__subnav-content">
+				<div class="o-header-services__secondary-nav-content" data-o-header-services-nav-list>
-					<ol class="o-header-services__subnav-list o-header-services__subnav-list--breadcrumb" aria-label="Breadcrumb">
+					<ol class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--ancestors" aria-label="Ancestor sections">
-						<li class="o-header-services__subnav-item">
+						<li>
-							<a class="o-header-services__subnav-link" href={{href}} aria-selected="true" aria-label="Current page">
+							<a href={{href}} aria-current="true" aria-label="Current page">
								current section
							</a>
						</li>
						<!-- more ancestors -->
					</ol>

-					<ul class="o-header-services__subnav-list o-header-services__subnav-list--children" aria-label="Subsections">
+					<ul class="o-header-services__secondary-nav-list o-header-services__secondary-nav-list--children" aria-label="Child sections">
-						<li class="o-header-services__subnav-item">
+						<li>
-							<a class="o-header-services__subnav-link" href="{{href}}">
+							<a href="{{href}}">
								child page
							</a>
						</li>
						<!-- more children -->
						</li>
					</ul>
				</div>
-		<button class="o-header__subnav-button o-header__subnav-button--left" title="scroll left" aria-hidden="true" disabled></button>
-		<button class="o-header__subnav-button o-header__subnav-button--right" title="scroll right" aria-hidden="true" disabled></button>

+		<button class="o-header-services__scroll-button o-header-services__scroll-button--left" title="scroll left" aria-hidden="true" disabled></button>
+		<button class="o-header-services__scroll-button o-header-services__scroll-button--right" title="scroll right" aria-hidden="true" disabled></button>
-			</div>
-		</div>
-	</div>
</nav>

-<!-- All drawer markup has been removed! -->
```

### Migrating from v1.x.x to v2.x.x

V2 bumps to the new major versions of o-header, o-colors, and o-typography. If you are using any of these components in your projects you will have bower conflicts that you need to resolve by upgrading those components too.
V2 includes some minor visual changes, but these shouldn't be breaking changes for projects that include them.

----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-header-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
