import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';
import { icons, checkAttr, getAttrKey, IconLabel, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const {
		options: manifestOptions,
	} = manifest;

	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowItems = checkAttr('carouselShowItems', attributes, manifest);
	const carouselShowPrevNext = checkAttr('carouselShowPrevNext', attributes, manifest);
	const carouselShowPagination = checkAttr('carouselShowPagination', attributes, manifest);

	return (
		<PanelBody title={__('Carousel', 'andbrand-wp-plugin-block-base')}>

			<IconToggle
				icon={icons.loopMode}
				label={__('Loop mode', 'andbrand-wp-plugin-block-base')}
				help={__('Allows infinite scrolling through the items.', 'andbrand-wp-plugin-block-base')}
				checked={carouselIsLoop}
				onChange={(value) => setAttributes({ [getAttrKey('carouselIsLoop', attributes, manifest)]: value })}
			/>

			<hr />

			<IconToggle
				icon={icons.arrowsHorizontal}
				label={__('Navigation buttons', 'andbrand-wp-plugin-block-base')}
				checked={carouselShowPrevNext}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowPrevNext', attributes, manifest)]: value })}
			/>

			<IconToggle
				icon={icons.order}
				label={__('Pagination', 'andbrand-wp-plugin-block-base')}
				checked={carouselShowPagination}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowPagination', attributes, manifest)]: value })}
			/>

			<hr />

			<BaseControl
				label={<IconLabel icon={icons.visible} label={__('Number of slides visible', 'andbrand-wp-plugin-block-base')} />}
				help={__('Number of items to show at a time (on tablet width and up).', 'andbrand-wp-plugin-block-base')}
			/>
			<IconToggle
				label={__('Automatic', 'andbrand-wp-plugin-block-base')}
				help={__('Fit as many as possible. Works best when items are all same size.', 'andbrand-wp-plugin-block-base')}
				checked={carouselShowItems === -1}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value ? -1 : 1 })}
			/>

			{carouselShowItems !== -1 &&
				<RangeControl
					label={__('Slides visible', 'andbrand-wp-plugin-block-base')}
					value={carouselShowItems}
					onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value })}
					min={manifestOptions.carouselItemsToShow.min}
					max={manifestOptions.carouselItemsToShow.max}
					step={manifestOptions.carouselItemsToShow.step}
				/>
			}
		</PanelBody>
	);
};
