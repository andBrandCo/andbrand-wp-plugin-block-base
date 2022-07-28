<?php

/**
 * Template for the Card Block.
 *
 * @package SebCmWpPluginBlockLibrary
 */

use SebCmWpPluginBlockLibraryPluginVendor\EightshiftLibs\Helpers\Components;

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'card',
	Components::props('card', $attributes)
);
