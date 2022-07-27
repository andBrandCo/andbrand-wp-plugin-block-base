import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, BaseControl, Placeholder, ExternalLink, TextControl, Notice } from '@wordpress/components';
import { getOption, checkAttr, getAttrKey, IconLabel, icons, Collapsable, ComponentUseToggle, IconToggle, SimpleVerticalSingleSelect, FancyDivider, CustomSelect, CustomSelectCustomOption, CustomSelectCustomValueDisplay } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const VideoOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		videoShowControls = true,

		showVideoUse = false,
		showLabel = false,
		showVideoUrl = true,
		showVideoPoster = true,
		showVideoLoop = true,
		showVideoAdvanced = true,
		showVideoAutoplay = true,
		showVideoControls = true,
		showVideoMuted = true,
		showVideoPreload = true,
		showVideoCaptions = true,
	} = attributes;

	const videoUse = checkAttr('videoUse', attributes, manifest);
	const videoUrl = checkAttr('videoUrl', attributes, manifest);
	const videoPoster = checkAttr('videoPoster', attributes, manifest);
	const videoAccept = checkAttr('videoAccept', attributes, manifest);
	const videoAllowedTypes = checkAttr('videoAllowedTypes', attributes, manifest);
	const videoLoop = checkAttr('videoLoop', attributes, manifest);
	const videoAutoplay = checkAttr('videoAutoplay', attributes, manifest);
	const videoControls = checkAttr('videoControls', attributes, manifest);
	const videoMuted = checkAttr('videoMuted', attributes, manifest);
	const videoPreload = checkAttr('videoPreload', attributes, manifest);
	const videoSubtitleTracks = checkAttr('videoSubtitleTracks', attributes, manifest);

	if (!videoShowControls) {
		return null;
	}

	const hasVideo = videoUrl?.length > 0;
	const hasPoster = videoPoster?.length > 0;

	const [showAdvanced, setShowAdvanced] = useState(false);

	const [trackEditOpen, setTrackEditOpen] = useState({});

	const addCaptionItem = () => {
		const modifiedVideoSubtitleTracks = ([...videoSubtitleTracks, {
			src: '',
			kind: '',
			label: '',
			srclang: '',
		}]);

		setAttributes({
			[getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks
		});
	};

	const getTrackIcon = (kind) => {							
		switch (kind) {
			case 'subtitles':
				return icons.videoSubtitle;
			case 'captions':
				return icons.closedCaptions;
			case 'descriptions':
				return icons.hide;
			case 'chapters':
				return icons.videoChapters;
		}
		return icons.warning;
	};

	const useToggle = (
		<ComponentUseToggle
			label={label}
			checked={videoUse}
			onChange={(value) => setAttributes({ [getAttrKey('videoUse', attributes, manifest)]: value })}
			showUseToggle={showVideoUse}
			showLabel={showLabel}
		/>
	);

	if (!videoUse) {
		return useToggle;
	}

	return (
		<>
			{useToggle}

			{!showVideoUrl && hasVideo &&
				<>
					<Button
						isSecondary
						isDestructive
						onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
						icon={icons.trash}
					>
						{__('Remove video', 'andbrand-wp-plugin-block-base')}
					</Button>
					<hr />
				</>
			}

			{!showVideoUrl && !hasVideo &&
				<Placeholder
					icon={icons.help}
					label={__('No video... yet', 'andbrand-wp-plugin-block-base')}
				>
					{__('Add one in the Block editor', 'andbrand-wp-plugin-block-base')}
				</Placeholder>
			}

			{showVideoUrl &&
				<BaseControl
					label={
						<>
							<IconLabel icon={icons.video} label={__('Video', 'andbrand-wp-plugin-block-base')} />

							{hasVideo &&
								<Button
									isSecondary
									isSmall
									isDestructive
									className='es-small-square-icon-button'
									onClick={() => setAttributes({ [getAttrKey('videoUrl', attributes, manifest)]: [] })}
									icon={icons.trash}
									label={__('Remove video', 'andbrand-wp-plugin-block-base')}
								/>
							}
						</>
					}
				>
					{!hasVideo &&
						<MediaPlaceholder
							icon={icons.videoFile}
							onSelect={(value) => setAttributes({
								[getAttrKey('videoUrl', attributes, manifest)]: value.map(({ url, mime, mime_type }) => {
									return {
										url,
										mime: typeof (mime) === 'undefined' ? mime_type : mime,
									};
								})
							})
							}
							labels={{ title: __('Add a video', 'andbrand-wp-plugin-block-base') }}
							accept={videoAccept}
							allowedTypes={videoAllowedTypes}
							multiple
						/>
					}

					{hasVideo &&
						<Placeholder
							icon={icons.checkCircle}
							label={__('Video added', 'andbrand-wp-plugin-block-base')}
						>
							{__('Check the Block editor', 'andbrand-wp-plugin-block-base')}
						</Placeholder>
					}

				</BaseControl>
			}

			{showVideoPoster && hasVideo &&
				<BaseControl
					label={
						<>
							<IconLabel icon={icons.videoPosterImage} label={__('Poster image', 'andbrand-wp-plugin-block-base')} />

							{hasPoster &&
								<Button
									isSecondary
									isSmall
									isDestructive
									className='es-small-square-icon-button'
									onClick={() => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: {} })}
									icon={icons.trash}
									label={__('Remove video poster image', 'andbrand-wp-plugin-block-base')}
								/>
							}
						</>
					}
					help={__('Visible before the video is played. Make sure to enable the video controls so the video can be started!', 'andbrand-wp-plugin-block-base')}
				>
					{!hasPoster &&
						<MediaPlaceholder
							labels={{ title: __('Add an image', 'andbrand-wp-plugin-block-base') }}
							icon={icons.imageFile}
							onSelect={(value) => setAttributes({ [getAttrKey('videoPoster', attributes, manifest)]: value.url })}
							accept={'image/*'}
							allowedTypes={['image']}
						/>
					}

					{hasPoster &&
						<img src={videoPoster} alt='Video poster' className='es-ratio-sixteen-nine es-rounded-4' />
					}
				</BaseControl>
			}

			<br />

			{showVideoAdvanced && hasVideo &&
				<div className='es-flex-between'>
					<IconLabel icon={icons.options} label={__('Advanced settings', 'andbrand-wp-plugin-block-base')} standalone />
					<Button
						onClick={() => setShowAdvanced(!showAdvanced)}
						label={showAdvanced ? __('Hide', 'andbrand-wp-plugin-block-base') : __('Show', 'andbrand-wp-plugin-block-base')}
						icon={showAdvanced ? icons.chevronUp : icons.chevronDown}
						iconSize={24}
						isSecondary
					/>
				</div>
			}

			{showAdvanced && hasVideo &&
				<>
					<br />

					{showVideoLoop &&
						<IconToggle
							icon={icons.loopMode}
							label={__('Loop', 'andbrand-wp-plugin-block-base')}
							checked={videoLoop}
							onChange={(value) => setAttributes({ [getAttrKey('videoLoop', attributes, manifest)]: value })}
						/>
					}

					{showVideoAutoplay &&
						<IconToggle
							icon={icons.autoplay}
							label={__('Autoplay', 'andbrand-wp-plugin-block-base')}
							checked={videoAutoplay}
							onChange={(value) => setAttributes({ [getAttrKey('videoAutoplay', attributes, manifest)]: value })}
						/>
					}

					{showVideoControls &&
						<IconToggle
							icon={icons.videoControls}
							label={__('Video controls', 'andbrand-wp-plugin-block-base')}
							checked={videoControls}
							onChange={(value) => setAttributes({ [getAttrKey('videoControls', attributes, manifest)]: value })}
						/>
					}

					{showVideoMuted &&
						<IconToggle
							icon={icons.muteCentered}
							label={__('No sound', 'andbrand-wp-plugin-block-base')}
							checked={videoMuted}
							onChange={(value) => setAttributes({ [getAttrKey('videoMuted', attributes, manifest)]: value })}
						/>
					}


					{videoAutoplay && !videoMuted && !videoControls &&
						<Notice 
							status="warning"
							isDismissible={false}
						>
							{__('This video autoplays with sound and without controls. Reconsider these choices, as they present a challenge to disabled users, cause frustration for all users and might be a violation of WCAG.', 'andbrand-wp-plugin-block-base')}
						</Notice>
					}

					{showVideoPreload && <br />}

					{showVideoPreload &&
						<SimpleVerticalSingleSelect
							label={<IconLabel icon={icons.play} label={__('Preload type', 'andbrand-wp-plugin-block-base')} />}
							options={getOption('videoPreload', attributes, manifest).map(({ label, value, icon: iconName }) => {
								return {
									onClick: () => setAttributes({ [getAttrKey('videoPreload', attributes, manifest)]: value }),
									label,
									isActive: videoPreload === value,
									icon: icons[iconName],
								};
							})}
						/>
					}
				</>
			}

			{showVideoCaptions && hasVideo &&
				<>
					<FancyDivider label={__('Captions', 'andbrand-wp-plugin-block-base')} />

					<div className='es-v-spaced'>
						{videoSubtitleTracks.map((_, index) => {
							const trackIcon = getTrackIcon(videoSubtitleTracks[index].kind);

							return (
								<div className='onefr-auto' key={index}>
										<Collapsable 
											label={
												<IconLabel
													standalone={true}
													icon={trackIcon}
													label={videoSubtitleTracks[index].label.length > 0 ? videoSubtitleTracks[index].label : __('New caption track', 'andbrand-wp-plugin-block-base')}
												/>
											}
										>
										
											<>
												{!videoSubtitleTracks[index].src &&
													<MediaPlaceholder
														accept={['.vtt', 'text/vtt']}
														labels = {{
															title: __('Track file', 'andbrand-wp-plugin-block-base'),
														}}
														onSelect={
															(track) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].src = track.url;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}
														}
													>
														{__('Upload a VTT file containing captions, subtitles, descriptions or chapters for this video', 'andbrand-wp-plugin-block-base')}
													</MediaPlaceholder>
												}

												{videoSubtitleTracks[index].src &&
													<>
														<b>{sprintf(__('Track #%d', 'andbrand-wp-plugin-block-base'), index + 1)}</b>

														<hr />

														<ExternalLink href={videoSubtitleTracks[index].src}>
															{__('Open track file', 'andbrand-wp-plugin-block-base')}
														</ExternalLink>

														<TextControl
															label={__('Track label', 'andbrand-wp-plugin-block-base')}
															help={__('A user-readable title of the text track, shown to viewers when listing available text tracks', 'andbrand-wp-plugin-block-base')}
															value={videoSubtitleTracks[index].label}
															onChange={(label) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].label = label;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
														/>

														<CustomSelect
															label={__('Track type', 'andbrand-wp-plugin-block-base')}
															value={videoSubtitleTracks[index].kind}
															options={getOption('videoSubtitleTrackKind', attributes, manifest)}
															simpleValue={true}
															onChange={(kind) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].kind = kind;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
															customOptionComponent = { props => {
																return (
																	<CustomSelectCustomOption {...props}>
																		<span className='es-h-start'>{getTrackIcon(props.value)} {props.label}</span>
																	</CustomSelectCustomOption>
																);
															}}
															customSingleValueDisplayComponent = { props => {
																return (
																	<CustomSelectCustomValueDisplay {...props}>
																		<span className='es-h-start'>{getTrackIcon(props.children.toLowerCase())} {props.children}</span>
																	</CustomSelectCustomValueDisplay>
																);
															}}
														/>

														<TextControl
															label={__('Language code', 'andbrand-wp-plugin-block-base')}
															help={__('An IETF (BCP47) language tag for the language of the track text data. Only required for subtitles.', 'andbrand-wp-plugin-block-base')}
															value={videoSubtitleTracks[index].srclang}
															onChange={(srclang) => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks[index].srclang = srclang;
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
														/>

														<ExternalLink href={'https://en.wikipedia.org/wiki/IETF_language_tag#List_of_major_primary_language_subtags'}>
															{__('Language tags for major languages', 'andbrand-wp-plugin-block-base')}
														</ExternalLink>

														<br />

														<ExternalLink href={'https://r12a.github.io/app-subtags/'}>
															{__('Language tags for all languages', 'andbrand-wp-plugin-block-base')}
														</ExternalLink>

														<hr />

														<Button
															isDestructive
															isSecondary
															onClick={() => {
																const modifiedVideoSubtitleTracks = [...videoSubtitleTracks];
																modifiedVideoSubtitleTracks.splice(index, 1);
																setTrackEditOpen({...trackEditOpen, [index]: false});
																setAttributes({ [getAttrKey('videoSubtitleTracks', attributes, manifest)]: modifiedVideoSubtitleTracks });
															}}
															icon={icons.trash}
														>
															{__('Remove track', 'andbrand-wp-plugin-block-base')}
														</Button>

													</>
												}
											</>
										</Collapsable>
								</div>
							);
						})}
					</div>
					<Button
						isPrimary
						icon={icons.add}
						onClick={addCaptionItem}
					>
						{__('Add track', 'andbrand-wp-plugin-block-base')}
					</Button>
				</>
			}
		</>
	);
};
