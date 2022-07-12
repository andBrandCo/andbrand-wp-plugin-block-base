<?php

/**
 * The file that defines actions on plugin deactivation.
 *
 * @package AndbrandWpPluginBlockBase
 */

declare(strict_types=1);

namespace AndbrandWpPluginBlockBase;

use AndbrandWpPluginBlockBasePluginVendor\EightshiftLibs\Plugin\HasDeactivationInterface;

/**
 * The plugin deactivation class.
 */
class Deactivate implements HasDeactivationInterface
{

	/**
	 * Deactivate the plugin.
	 */
	public function deactivate(): void
	{
		\flush_rewrite_rules();
	}
}
