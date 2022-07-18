<?php
/**
 * Helpers for components
 *
 * @package AndbrandWpPluginBlockBase\Helpers
 */

declare(strict_types=1);

namespace AndbrandWpPluginBlockBase\Helpers;

use AndbrandWpPluginBlockBase\Config\Config;
use AndbrandWpPluginBlockBasePluginVendor\EightshiftLibs\Helpers\Components as LibsComponents;

/**
 * Helpers for components
 */
class Components extends LibsComponents
{
    /**
     * Local render method.
     */
    public static function render(string $component, array $attributes = [], string $parentPath = '', bool $useComponentDefaults = false): string
    {
        echo '<pre>';
        print_r(Config::getProjectPath());
        echo '</pre>';
        $parentPath = Config::getProjectPath();

        return parent::render($component, $attributes, $parentPath, $useComponentDefaults);
    }
}