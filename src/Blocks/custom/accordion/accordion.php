<?php

/**
 * Template for the Accordion Block view.
 *
 * @package SebCmWpPluginBlockLibrary
 */

use SebCmWpPluginBlockLibraryPluginVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'accordion',
	Components::props('accordion', $attributes, [
		'accordionAccordionContent' => $innerBlockContent
	])
);
