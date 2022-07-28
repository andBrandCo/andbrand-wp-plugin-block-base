<?php
/**
 * Helpers for components
 *
 * @package SebCmWpPluginBlockLibrary\Helpers
 */

declare(strict_types=1);

namespace SebCmWpPluginBlockLibrary\Helpers;

use SebCmWpPluginBlockLibrary\Config\Config;
use SebCmWpPluginBlockLibraryPluginVendor\EightshiftLibs\Helpers\Components as LibsComponents;

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
        $parentPath = Config::getProjectPath();

        return parent::render($component, $attributes, $parentPath, $useComponentDefaults);
    }
}