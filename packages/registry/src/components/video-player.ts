import { ComponentRegistryEntry } from '../types.js';

export const videoPlayerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'video-player',
  name: 'VideoPlayer',
  type: 'component',
  category: 'media',
  capabilities: ['content-primitive'],

  // ── Description ───────────────────────────────────────
  description:
    'A full-featured video player with HLS streaming, playlists, picture-in-picture, fullscreen, captions, quality selection, and compound sub-components.',
  longDescription:
    'The VideoPlayer component is a comprehensive media solution using the compound component pattern. It supports single tracks and playlists, HLS (.m3u8) streaming via hls.js with automatic quality level detection, adaptive bitrate switching, error recovery, native fullscreen and picture-in-picture, subtitle/caption tracks, playback speed control, auto-hiding controls, shuffle and loop modes, and rich keyboard shortcuts. A global manager ensures only one player is active at a time unless allowMultiple is enabled.',
  tags: [
    'video',
    'player',
    'media',
    'playlist',
    'hls',
    'streaming',
    'fullscreen',
    'picture-in-picture',
    'captions',
    'subtitles',
    'quality',
    'controls',
  ],
  useCases: [
    'Video streaming platforms with HLS adaptive bitrate playback',
    'Courseware and educational platforms with chapter-based playlists',
    'Media galleries with playlist navigation and thumbnail previews',
    'Live event broadcasts with captions and quality switching',
    'Accessible video widgets with keyboard navigation and ARIA support',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'VideoPlayer',
  files: [
    {
      name: 'VideoPlayer.tsx',
      description:
        'Root VideoPlayer component with context provider, HLS integration, video element management, state management, keyboard handling, and global multi-instance coordinator',
    },
    {
      name: 'Video.tsx',
      description:
        'Video element wrapper with poster support, object-fit options, and click-to-toggle-play behavior',
    },
    {
      name: 'VideoPlayerControls.tsx',
      description:
        'Controls container with auto-hide behavior based on mouse/touch activity and playback state',
    },
    {
      name: 'VideoPlayerPlayback.tsx',
      description:
        'PlayPause, Next, and Previous buttons with loading state awareness and disabled state handling',
    },
    {
      name: 'VideoPlayerPlaylist.tsx',
      description:
        'Playlist container, TrackItem with active highlighting, TrackInfo display, and renderless Source component',
    },
    {
      name: 'VideoPlayerProgress.tsx',
      description:
        'Progress bar, interactive Seek slider with drag support and keyboard navigation, Time display, and Buffer indicator',
    },
    {
      name: 'VideoPlayerStatus.tsx',
      description:
        'Loading overlay with spinner and Error alert banner with dismiss button',
    },
    {
      name: 'VideoPlayerVolume.tsx',
      description:
        'Volume range input and Mute toggle button with dynamic icon states',
    },
    {
      name: 'VideoPlayerAdvanced.tsx',
      description:
        'Advanced controls: Fullscreen, Picture-in-Picture, Captions toggle, Quality selector, and Speed selector',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript interfaces for VideoTrack, VideoQuality, VideoPlayerState, VideoPlayerActions, VideoPlayerContextValue, and all sub-component prop types',
    },
    {
      name: 'utils.ts',
      description:
        'Utility functions: formatTime, isHLS, shuffleArray, and VIDEO_BTN shared class constant',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file assembling the compound component via Object.assign and re-exporting hooks and types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'VideoPlayer',
  subComponents: [
    {
      name: 'Video',
      fileName: 'Video.tsx',
      description:
        'Renders the HTML video element with poster support, object-fit styling, and click-to-toggle-play.',
      props: [
        {
          name: 'poster',
          type: 'string',
          required: false,
          description: 'Poster image URL shown before playback starts',
        },
        {
          name: 'objectFit',
          type: "'contain' | 'cover'",
          required: false,
          defaultValue: "'contain'",
          description: 'CSS object-fit for the video element',
          options: ['contain', 'cover'],
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the video wrapper',
        },
      ],
    },
    {
      name: 'Source',
      fileName: 'VideoPlayerPlaylist.tsx',
      description:
        'Renderless component that finds and plays a matching track from the playlist by src.',
      props: [
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'Source URL to match against the playlist',
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Track title',
        },
        {
          name: 'artist',
          type: 'string',
          required: false,
          description: 'Artist name',
        },
        {
          name: 'poster',
          type: 'string',
          required: false,
          description: 'Poster image URL',
        },
        {
          name: 'subtitleSrc',
          type: 'string',
          required: false,
          description: 'Subtitle track URL (VTT format)',
        },
      ],
    },
    {
      name: 'Playlist',
      fileName: 'VideoPlayerPlaylist.tsx',
      description: 'Container for a list of VideoPlayer.Track items.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'VideoPlayer.Track items',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Track',
      fileName: 'VideoPlayerPlaylist.tsx',
      description:
        'Individual track item with active state highlighting, index display, and poster thumbnail.',
      props: [
        {
          name: 'track',
          type: 'VideoTrack',
          required: true,
          description: 'VideoTrack object with id, src, title, artist, poster, and optional subtitleSrc',
        },
        {
          name: 'activeClassName',
          type: 'string',
          required: false,
          description: 'Additional classes applied when this track is active',
        },
        {
          name: 'showIndex',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'Whether to show the track index or play indicator',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'TrackInfo',
      fileName: 'VideoPlayerPlaylist.tsx',
      description: 'Displays the current track title, artist, and optional poster.',
      props: [
        {
          name: 'showPoster',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to display the track poster image',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Controls',
      fileName: 'VideoPlayerControls.tsx',
      description:
        'Container for control buttons with optional auto-hide behavior after inactivity.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'Control buttons and UI elements',
        },
        {
          name: 'autoHide',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether controls fade out after a period of inactivity while playing',
        },
        {
          name: 'autoHideDelay',
          type: 'number',
          required: false,
          defaultValue: '3000',
          description: 'Delay in milliseconds before auto-hiding controls',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'PlayPause',
      fileName: 'VideoPlayerPlayback.tsx',
      description:
        'Toggle button for play/pause state. Accepts custom children or a render function.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode | ((playing: boolean) => React.ReactNode)',
          required: false,
          description: 'Custom content or render function receiving the playing state',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Next',
      fileName: 'VideoPlayerPlayback.tsx',
      description: 'Button to advance to the next track. Disabled when playlist has one or fewer items.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom button content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Previous',
      fileName: 'VideoPlayerPlayback.tsx',
      description:
        'Button to go to the previous track, or restart the current track if past 3 seconds.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom button content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Progress',
      fileName: 'VideoPlayerProgress.tsx',
      description:
        'Read-only progress bar with buffered indicator and ARIA progressbar attributes.',
      props: [
        {
          name: 'showBuffer',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to show the buffered range behind the progress',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Seek',
      fileName: 'VideoPlayerProgress.tsx',
      description:
        'Interactive seek slider supporting mouse drag, keyboard arrows, Home/End keys, and ARIA slider role.',
      props: [
        {
          name: 'showBuffer',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to show the buffered range',
        },
        {
          name: 'showThumb',
          type: 'boolean',
          required: false,
          defaultValue: 'true',
          description: 'Whether to show the draggable thumb indicator',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Time',
      fileName: 'VideoPlayerProgress.tsx',
      description:
        'Displays current time and total duration. Can optionally show remaining time.',
      props: [
        {
          name: 'showRemaining',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, shows remaining time instead of total duration',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Buffer',
      fileName: 'VideoPlayerProgress.tsx',
      description: 'Standalone buffered progress indicator with ARIA progressbar role.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Volume',
      fileName: 'VideoPlayerVolume.tsx',
      description: 'Range input for adjusting playback volume from 0 to 1.',
      props: [
        {
          name: 'vertical',
          type: 'boolean',
          required: false,
          defaultValue: 'false',
          description: 'When true, rotates the slider for vertical orientation',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Mute',
      fileName: 'VideoPlayerVolume.tsx',
      description:
        'Toggle button for mute/unmute. Accepts custom children or a render function.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode | ((muted: boolean) => React.ReactNode)',
          required: false,
          description: 'Custom content or render function receiving the muted state',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Fullscreen',
      fileName: 'VideoPlayerAdvanced.tsx',
      description:
        'Toggle button for native fullscreen mode on the player container.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode | ((isFullscreen: boolean) => React.ReactNode)',
          required: false,
          description: 'Custom content or render function receiving the fullscreen state',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'PiP',
      fileName: 'VideoPlayerAdvanced.tsx',
      description:
        'Toggle button for Picture-in-Picture mode. Renders null when PiP is not supported.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode | ((isPiP: boolean) => React.ReactNode)',
          required: false,
          description: 'Custom content or render function receiving the PiP state',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Captions',
      fileName: 'VideoPlayerAdvanced.tsx',
      description:
        'Toggle button for enabling/disabling subtitle tracks. Disabled when no captions are available.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode | ((enabled: boolean) => React.ReactNode)',
          required: false,
          description: 'Custom content or render function receiving the captions enabled state',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Quality',
      fileName: 'VideoPlayerAdvanced.tsx',
      description:
        'Select dropdown for HLS quality levels. Renders null for non-HLS content or when only one quality exists.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Speed',
      fileName: 'VideoPlayerAdvanced.tsx',
      description: 'Select dropdown for playback speed with configurable rate options.',
      props: [
        {
          name: 'rates',
          type: 'number[]',
          required: false,
          defaultValue: '[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]',
          description: 'Array of available playback rates',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Loading',
      fileName: 'VideoPlayerStatus.tsx',
      description:
        'Overlay spinner shown while video is loading or buffering. Renders null when not loading.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom loading text or content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'VideoPlayerStatus.tsx',
      description:
        'Error banner displayed at the bottom of the player when playback fails. Includes a dismiss button.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: false,
          description: 'Custom error message content',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes',
        },
      ],
    },
  ],
  hooks: ['useVideoPlayer', 'useVideoPlayerState', 'useVideoPlayerActions'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'VideoPlayer sub-components (Video, Controls, PlayPause, Progress, Volume, etc.) composing the full player UI',
    },
    {
      name: 'track',
      type: 'VideoTrack',
      required: false,
      description: 'Single video track to play. If provided, it is prepended to the playlist.',
    },
    {
      name: 'playlist',
      type: 'VideoTrack[]',
      required: false,
      defaultValue: '[]',
      description: 'Array of video tracks for playlist navigation',
    },
    {
      name: 'defaultVolume',
      type: 'number',
      required: false,
      defaultValue: '0.8',
      description: 'Initial volume level from 0 to 1',
    },
    {
      name: 'defaultMuted',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Whether the video starts muted',
    },
    {
      name: 'defaultPlaybackRate',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'Initial playback speed',
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'When false (default), playing this player pauses all other VideoPlayer instances via the global manager',
    },
    {
      name: 'autoPlay',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'Whether to start playback automatically when a track loads',
    },
    {
      name: 'onPlay',
      type: '() => void',
      required: false,
      description: 'Callback fired when playback starts',
    },
    {
      name: 'onPause',
      type: '() => void',
      required: false,
      description: 'Callback fired when playback pauses',
    },
    {
      name: 'onTrackChange',
      type: '(track: VideoTrack | null) => void',
      required: false,
      description: 'Callback fired when the active track changes',
    },
    {
      name: 'onTimeUpdate',
      type: '(currentTime: number) => void',
      required: false,
      description: 'Callback fired on each timeupdate event with the current playback time',
    },
    {
      name: 'onEnded',
      type: '() => void',
      required: false,
      description: 'Callback fired when the current track ends',
    },
    {
      name: 'onError',
      type: '(error: string) => void',
      required: false,
      description: 'Callback fired when a playback error occurs',
    },
    {
      name: 'onFullscreenChange',
      type: '(isFullscreen: boolean) => void',
      required: false,
      description: 'Callback fired when fullscreen state changes',
    },
  ],
  rendersAs: 'div',

  // ── States ────────────────────────────────────────────
  states: [
    {
      name: 'isPlaying',
      prop: 'isPlaying',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether video is currently playing',
    },
    {
      name: 'isLoading',
      prop: 'isLoading',
      isBoolean: true,
      defaultValue: 'true',
      description: 'Whether video is loading or buffering',
    },
    {
      name: 'isFullscreen',
      prop: 'isFullscreen',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the player is in fullscreen mode',
    },
    {
      name: 'isPiP',
      prop: 'isPiP',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether Picture-in-Picture mode is active',
    },
    {
      name: 'captionsEnabled',
      prop: 'captionsEnabled',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether subtitle/caption tracks are visible',
    },
    {
      name: 'volume',
      prop: 'volume',
      isBoolean: false,
      defaultValue: '0.8',
      description: 'Current playback volume from 0 to 1',
    },
    {
      name: 'isMuted',
      prop: 'isMuted',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether audio is muted',
    },
    {
      name: 'playbackRate',
      prop: 'playbackRate',
      isBoolean: false,
      defaultValue: '1',
      description: 'Current playback speed',
    },
    {
      name: 'loop',
      prop: 'loop',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the current track loops on completion',
    },
    {
      name: 'shuffle',
      prop: 'shuffle',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether playlist navigation is randomized',
    },
    {
      name: 'currentTrack',
      prop: 'currentTrack',
      isBoolean: false,
      description: 'The currently active VideoTrack',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: false,
      description: 'Error message string when playback fails',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onPlay',
      signature: '() => void',
      description: 'Fired when video playback begins',
    },
    {
      name: 'onPause',
      signature: '() => void',
      description: 'Fired when video playback pauses',
    },
    {
      name: 'onTrackChange',
      signature: '(track: VideoTrack | null) => void',
      description: 'Fired when the active track changes',
    },
    {
      name: 'onTimeUpdate',
      signature: '(currentTime: number) => void',
      description: 'Fired continuously during playback with the current time in seconds',
    },
    {
      name: 'onEnded',
      signature: '() => void',
      description: 'Fired when the current track reaches its end',
    },
    {
      name: 'onError',
      signature: '(error: string) => void',
      description: 'Fired when a playback or HLS error occurs',
    },
    {
      name: 'onFullscreenChange',
      signature: '(isFullscreen: boolean) => void',
      description: 'Fired when the player enters or exits fullscreen',
    },
    {
      name: 'onClick (Video)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Clicking the video area toggles play/pause',
    },
    {
      name: 'onKeyDown (Root)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description:
        'Root handles k/Space (play), m (mute), f (fullscreen), c (captions), arrows (seek/volume), n/p (next/previous), l (loop), s (shuffle)',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'region',
    attributes: [
      {
        name: 'aria-label',
        description: 'Set to "Video Player" on the root container for screen reader identification',
        managedByComponent: true,
      },
      {
        name: 'aria-label (PlayPause)',
        description: 'Dynamically set to "Play" or "Pause"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Mute)',
        description: 'Dynamically set to "Mute" or "Unmute"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Fullscreen)',
        description: 'Dynamically set to "Enter fullscreen" or "Exit fullscreen"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (PiP)',
        description: 'Dynamically set to "Enter picture-in-picture" or "Exit picture-in-picture"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Captions)',
        description: 'Dynamically set to "Enable captions" or "Disable captions"',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Seek)',
        description: 'Set to "Seek" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Volume)',
        description: 'Set to "Volume" on the range input',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Quality)',
        description: 'Set to "Video quality" on the select element',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Speed)',
        description: 'Set to "Playback speed" on the select element',
        managedByComponent: true,
      },
      {
        name: 'aria-pressed',
        description: 'Applied to toggle buttons (PlayPause, Mute, Fullscreen, PiP, Captions) to indicate active state',
        managedByComponent: true,
      },
      {
        name: 'aria-selected',
        description: 'Applied to playlist track items to indicate the active track',
        managedByComponent: true,
      },
      {
        name: 'aria-live',
        description: 'Set to "polite" on the loading overlay for screen reader announcements',
        managedByComponent: true,
      },
      {
        name: 'aria-live (Error)',
        description: 'Set to "assertive" on the error banner for immediate screen reader notification',
        managedByComponent: true,
      },
      {
        name: 'role (Progress)',
        description: 'Set to "progressbar" on Progress and Buffer with aria-valuemin, aria-valuemax, aria-valuenow',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Space / k',
        behavior: 'Toggle play/pause',
      },
      {
        key: 'm',
        behavior: 'Toggle mute',
      },
      {
        key: 'f',
        behavior: 'Toggle fullscreen',
      },
      {
        key: 'c',
        behavior: 'Toggle captions/subtitles',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Seek backward 5 seconds',
      },
      {
        key: 'ArrowRight',
        behavior: 'Seek forward 5 seconds',
      },
      {
        key: 'ArrowUp',
        behavior: 'Increase volume',
      },
      {
        key: 'ArrowDown',
        behavior: 'Decrease volume',
      },
      {
        key: 'n',
        behavior: 'Next track',
      },
      {
        key: 'p',
        behavior: 'Previous track',
      },
      {
        key: 'l',
        behavior: 'Toggle loop',
      },
      {
        key: 's',
        behavior: 'Toggle shuffle',
      },
    ],
    focusManagement:
      'The root container has tabIndex={-1} and captures keyboard events. Focusable controls use native button and input elements. The seek slider is keyboard-navigable with Arrow, Home, and End keys.',
    wcagLevel: 'AA',
    notes:
      'All interactive controls have explicit aria-labels. Toggle buttons use aria-pressed. The video element has aria-label="Video player". Subtitle tracks are appended as <track kind="subtitles"> elements. Error banners use role="alert" with aria-live="assertive".',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'hls.js' }],
  registryDependencies: [],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'VideoPlayer is commonly wrapped in a Card for consistent layout and elevation',
    },
    {
      slug: 'modal',
      reason: 'Video lightboxes and preview modals use VideoPlayer inside a Modal overlay',
    },
    {
      slug: 'slider',
      reason: 'Applications may prefer a custom Slider for volume instead of the native range input',
    },
    {
      slug: 'audio-player',
      reason: 'Media applications often combine video and audio players with shared design patterns',
    },
    {
      slug: 'typography',
      reason: 'Typography components can style track titles, descriptions, and playlist text',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Video',
      description: 'Single video with standard controls, progress, volume, and fullscreen.',
      code: `import { VideoPlayer } from 'vayu-ui';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';

export default function BasicVideoDemo() {
  return (
    <VideoPlayer
      track={{
        id: '1',
        src: '/video/demo.mp4',
        title: 'Demo Video',
        poster: '/posters/demo.jpg',
      }}
    >
      <VideoPlayer.Video />
      <VideoPlayer.Loading>Loading video…</VideoPlayer.Loading>
      <VideoPlayer.Error />
      <VideoPlayer.Controls>
        <VideoPlayer.Progress />
        <div className="flex items-center justify-between px-3 py-2 bg-black/80 text-white">
          <div className="flex items-center gap-2">
            <VideoPlayer.PlayPause>
              {(playing) => (playing ? <Pause /> : <Play />)}
            </VideoPlayer.PlayPause>
            <VideoPlayer.Time />
          </div>
          <div className="flex items-center gap-2">
            <VideoPlayer.Mute>
              {(muted) => (muted ? <VolumeX /> : <Volume2 />)}
            </VideoPlayer.Mute>
            <VideoPlayer.Volume />
            <VideoPlayer.Fullscreen>
              {(fs) => <Maximize />}
            </VideoPlayer.Fullscreen>
          </div>
        </div>
      </VideoPlayer.Controls>
    </VideoPlayer>
  );
}`,
      tags: ['basic', 'single-video', 'controls'],
    },
    {
      title: 'Playlist Video Player',
      description: 'Video player with a sidebar playlist and track navigation.',
      code: `import { VideoPlayer } from 'vayu-ui';

const playlist = [
  { id: '1', src: '/video/one.mp4', title: 'Episode 1', poster: '/posters/1.jpg' },
  { id: '2', src: '/video/two.mp4', title: 'Episode 2', poster: '/posters/2.jpg' },
  { id: '3', src: '/video/three.mp4', title: 'Episode 3', poster: '/posters/3.jpg' },
];

export default function PlaylistVideoDemo() {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <VideoPlayer playlist={playlist} className="flex-1">
        <VideoPlayer.Video />
        <VideoPlayer.Loading />
        <VideoPlayer.Error />
        <VideoPlayer.Controls>
          <VideoPlayer.Seek />
          <div className="flex items-center justify-between px-3 py-2 bg-black/80 text-white">
            <div className="flex items-center gap-2">
              <VideoPlayer.Previous>Prev</VideoPlayer.Previous>
              <VideoPlayer.PlayPause />
              <VideoPlayer.Next>Next</VideoPlayer.Next>
              <VideoPlayer.Time showRemaining />
            </div>
            <div className="flex items-center gap-2">
              <VideoPlayer.Mute />
              <VideoPlayer.Volume />
              <VideoPlayer.Captions>CC</VideoPlayer.Captions>
              <VideoPlayer.Fullscreen />
            </div>
          </div>
        </VideoPlayer.Controls>
      </VideoPlayer>
      <VideoPlayer.Playlist className="w-full lg:w-64">
        {playlist.map((t) => (
          <VideoPlayer.Track key={t.id} track={t} showIndex />
        ))}
      </VideoPlayer.Playlist>
    </div>
  );
}`,
      tags: ['playlist', 'multi-track', 'sidebar'],
    },
    {
      title: 'HLS Live Stream',
      description: 'Live HLS stream with quality selector and advanced controls.',
      code: `import { VideoPlayer } from 'vayu-ui';

export default function HLSVideoDemo() {
  return (
    <VideoPlayer
      track={{
        id: 'live',
        src: 'https://example.com/live/stream.m3u8',
        title: 'Live Broadcast',
        poster: '/posters/live.jpg',
      }}
      autoPlay
    >
      <VideoPlayer.Video objectFit="cover" />
      <VideoPlayer.Loading>Buffering live stream…</VideoPlayer.Loading>
      <VideoPlayer.Error />
      <VideoPlayer.Controls autoHideDelay={5000}>
        <VideoPlayer.Seek />
        <div className="flex items-center justify-between px-3 py-2 bg-black/80 text-white">
          <div className="flex items-center gap-2">
            <VideoPlayer.PlayPause />
            <VideoPlayer.Time />
          </div>
          <div className="flex items-center gap-2">
            <VideoPlayer.Mute />
            <VideoPlayer.Volume />
            <VideoPlayer.Quality />
            <VideoPlayer.Speed />
            <VideoPlayer.Fullscreen />
          </div>
        </div>
      </VideoPlayer.Controls>
    </VideoPlayer>
  );
}`,
      tags: ['hls', 'streaming', 'live', 'quality'],
    },
    {
      title: 'Accessible Video with Captions',
      description: 'Video with subtitle track, captions toggle, and keyboard shortcuts.',
      code: `import { VideoPlayer } from 'vayu-ui';

export default function AccessibleVideoDemo() {
  return (
    <VideoPlayer
      track={{
        id: '1',
        src: '/video/lecture.mp4',
        title: 'Accessible Lecture',
        subtitleSrc: '/subtitles/lecture-en.vtt',
      }}
    >
      <VideoPlayer.Video />
      <VideoPlayer.Loading />
      <VideoPlayer.Error />
      <VideoPlayer.Controls>
        <VideoPlayer.Progress />
        <div className="flex items-center justify-between px-3 py-2 bg-black/80 text-white">
          <div className="flex items-center gap-2">
            <VideoPlayer.Previous />
            <VideoPlayer.PlayPause />
            <VideoPlayer.Next />
            <VideoPlayer.Time />
          </div>
          <div className="flex items-center gap-2">
            <VideoPlayer.Mute />
            <VideoPlayer.Volume />
            <VideoPlayer.Captions>Captions</VideoPlayer.Captions>
            <VideoPlayer.PiP>PiP</VideoPlayer.PiP>
            <VideoPlayer.Fullscreen />
          </div>
        </div>
      </VideoPlayer.Controls>
    </VideoPlayer>
  );
}`,
      tags: ['accessible', 'captions', 'subtitles', 'a11y', 'pip'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside VideoPlayer',
      bad: '<div><VideoPlayer.PlayPause /></div>',
      good: '<VideoPlayer><VideoPlayer.Controls><VideoPlayer.PlayPause /></VideoPlayer.Controls></VideoPlayer>',
      reason:
        'All sub-components consume VideoPlayerContext. Rendering them outside the root throws an error because the context is undefined.',
    },
    {
      title: 'Forgetting track id in playlists',
      bad: '{ src: "/video.mp4", title: "Video" }',
      good: '{ id: "1", src: "/video.mp4", title: "Video" }',
      reason:
        'The id field is required on VideoTrack for playlist indexing and active state detection. Missing ids break track selection.',
    },
    {
      title: 'Relying on keyboard shortcuts inside input forms',
      bad: '<form><input /><VideoPlayer>...</VideoPlayer></form>',
      good: 'Place VideoPlayer outside forms or ensure inputs do not conflict with player hotkeys like Space, k, m, f.',
      reason:
        'The root container captures global keyboard events. Inputs inside the player area may have shortcut conflicts unless focus is managed.',
    },
    {
      title: 'Passing invalid playlist prop shape',
      bad: '<VideoPlayer playlist={[{ url: "/v.mp4" }]} />',
      good: '<VideoPlayer playlist={[{ id: "1", src: "/v.mp4", title: "Video" }]} />',
      reason:
        'Playlist items must conform to the VideoTrack interface with id, src, and title fields. Incorrect shapes cause runtime errors.',
    },
  ],
};
