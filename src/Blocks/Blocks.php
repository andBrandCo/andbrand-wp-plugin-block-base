<?php

/**
 * Class Blocks is the base class for Gutenberg blocks registration.
 * It provides the ability to register custom blocks using manifest.json.
 *
 * @package AndbrandWpPluginBlockBase\Blocks
 */

declare(strict_types=1);

namespace AndbrandWpPluginBlockBase\Blocks;

use AndbrandWpPluginBlockBasePluginVendor\EightshiftLibs\Blocks\AbstractBlocks;

/**
 * Class Blocks
 */
class Blocks extends AbstractBlocks
{

	/**
	 * Blocks unique string filter name constant.
	 *
	 * @var string
	 */
	public const REUSEABLE_BLOCKS_CAPABILITY = 'edit_reuseable_blocks'; 

	/**
	 * Blocks unique string filter name constant.
	 *
	 * @var string
	 */
	public const BLOCKS_DEPENDENCEY_FILTER_NAME = 'block_dependency';

	/**
	 * Register all the hooks
	 *
	 * @return void
	 */
	public function register(): void
	{
		// Register all custom blocks.
		\add_action('init', [$this, 'getBlocksDataFullRaw'], 10);
		\add_action('init', [$this, 'registerBlocks'], 11);

		// Remove P tags from content.
		\remove_filter('the_content', 'wpautop');

		// Create new custom category for custom blocks.
		if (\is_wp_version_compatible('5.8')) {
			\add_filter('block_categories_all', [$this, 'getCustomCategory'], 11, 2);
		} else {
			\add_filter('block_categories', [$this, 'getCustomCategoryOld'], 10, 2);
		}

		// Register custom theme support options.
		\add_action('after_setup_theme', [$this, 'addThemeSupport'], 25);

		// Register custom project color palette.
		\add_action('after_setup_theme', [$this, 'changeEditorColorPalette'], 11);

		// Filter block content.
		\add_filter('render_block_data', [$this, 'filterBlocksContent'], 10, 2);

		// Output inline css variables.
		\add_action('wp_footer', [$this, 'outputCssVariablesInline']);

		// Register Reuseable Blocks side menu
		\add_action('admin_menu', [$this, 'addReusableBlocks'], 11, 2);
	}

	/**
	 * Create custom category to assign all custom blocks
	 *
	 * This category will be shown on all blocks list in "Add Block" button.
	 *
	 * @hook block_categories This is a WP 5 - WP 5.7 compatible hook callback. Will not work with WP 5.8!
	 *
	 * @param array<array<string, mixed>> $categories Array of categories for block types.
	 * @param WP_Post $post Post being loaded.
	 *
	 * @return array<array<string, mixed>> Array of categories for block types.
	 */
	public function getCustomCategoryOld(array $categories, \WP_Post $post): array
	{
		return \array_merge(
			$categories,
			[
				[
					'slug' => 'andbrand-block-library',
					'title' => \esc_html__('andBRAND Block Library [compounds]', 'andbrand-plugin-block-library'),
					'icon' => 'admin-settings',
				],
			]
		);
	}

	/**
	 * Create custom category to assign all custom blocks
	 *
	 * This category will be shown on all blocks list in "Add Block" button.
	 *
	 * @hook block_categories_all Available from WP 5.8.
	 *
	 * @param array<array<string, mixed>> $block_categories Array of categories for block types.
	 * @param WP_Block_Editor_Context $blockEditorContext The current block editor context.
	 *
	 * @return array<array<string, mixed>> Array of categories for block types.
	 */
	public function getCustomCategory(array $block_categories, \WP_Block_Editor_Context $blockEditorContext): array
	{
		return \array_merge(
			$block_categories,
			[
				[
					'slug' => 'andbrand-block-library',
					'title' => \esc_html__('andBRAND Block Library [compounds]', 'andbrand-plugin-block-library'),
					'icon' => 'admin-settings',
				],
			]
		);
	}



	public function addReusableBlocks(): void
	{
		\add_menu_page( 
			\esc_html__('Blocks', 'andbrand-plugin-block-library'), 
			\esc_html__('Blocks', 'andbrand-plugin-block-library'),  
			self::REUSEABLE_BLOCKS_CAPABILITY,
			'edit.php?post_type=wp_block', 
			'dashicons-editor-table', 
			4 
		);
		
	}
}
