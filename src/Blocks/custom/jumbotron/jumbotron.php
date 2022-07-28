<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package AndbrandWpPluginBlockBase
 */

use AndbrandWpPluginBlockBasePluginVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'jumbotron',
	Components::props('jumbotron', $attributes)
);
