<?php

/**
 * Template for the Card Block.
 *
 * @package AndbrandWpPluginBlockBase
 */

use AndbrandWpPluginBlockBasePluginVendor\EightshiftLibs\Helpers\Components;

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'card',
	Components::props('card', $attributes)
);
