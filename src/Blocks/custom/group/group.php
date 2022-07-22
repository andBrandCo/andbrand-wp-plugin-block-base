<?php

/**
 * Template for the Group block.
 *
 * @package AndbrandWpPluginBlockBase
 */

$blockClass = $attributes['blockClass'] ?? '';

?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php echo $innerBlockContent; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
</div>
