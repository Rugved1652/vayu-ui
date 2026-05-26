import { ComponentRegistryEntry } from '../types.js';

export const audioPlayerEntry: ComponentRegistryEntry = {
  // ── Identity ──────────────────────────────────────────
  slug: 'audio-player',
  name: 'AudioPlayer',
  type: 'component',
  category: 'media',
  capabilities: ['content-primitive'],

  // ── Description ───────────────────────────────────────
  description:
    'A feature-rich audio player with playlist support, HLS streaming, keyboard controls, playback rate, volume, and compound sub-components.',
  longDescription:
    'The AudioPlayer component provides a complete media playback solution using the compound component pattern. It supports single tracks and playlists, HLS (.m3u8) streaming via optional hls.js integration, global play management (only one player active at a time unless allowMultiple is set), smooth RAF-based progress polling, keyboard shortcuts (Space, Arrows, N/P), and granular sub-components for controls, playlist, track info, progress, volume, playback rate, and status indicators.',
  tags: [
    'audio',
    'player',
    'media',
    'playlist',
    'hls',
    'streaming',
    'music',
    'podcast',
    'controls',
    'progress',
    'volume',
  ],
  useCases: [
    'Music players with playlist navigation and track metadata display',
    'Podcast players with playback speed control and seek functionality',
    'Audio streaming with HLS (.m3u8) support for live broadcasts',
    'Multi-track playlists with auto-play next and loop options',
    'Accessible audio widgets with full keyboard navigation and ARIA labels',
  ],

  // ── File & CLI ────────────────────────────────────────
  directoryName: 'AudioPlayer',
  files: [
    {
      name: 'Audio.tsx',
      description:
        'Root AudioPlayer component with context provider, audio element management, HLS integration, state management, and keyboard event handling',
    },
    {
      name: 'AudioControls.tsx',
      description:
        'Compound sub-components: Controls container, PlayPause button, Next/Previous buttons, and Time display',
    },
    {
      name: 'AudioPlaylist.tsx',
      description:
        'Playlist container and Track item sub-components for rendering and selecting tracks from a list',
    },
    {
      name: 'AudioProgress.tsx',
      description:
        'Interactive Seek slider and Progress bar with buffered indicator, pointer drag support, and ARIA slider attributes',
    },
    {
      name: 'AudioRate.tsx',
      description:
        'Playback rate selector using a Popover dropdown with preset speeds from 0.5x to 2x',
    },
    {
      name: 'AudioStatus.tsx',
      description:
        'Status indicators: Loading spinner, Error alert, and Buffer alias for playback state feedback',
    },
    {
      name: 'AudioTrackInfo.tsx',
      description:
        'Displays current track metadata including title, artist, and poster artwork',
    },
    {
      name: 'AudioVolume.tsx',
      description:
        'Volume slider using Slider component and Mute toggle button with icon state changes',
    },
    {
      name: 'types.ts',
      description:
        'TypeScript interfaces for Track, AudioPlayerState, AudioPlayerActions, AudioPlayerGetters, RootProps, and PropGetter',
    },
    {
      name: 'utils.ts',
      description:
        'Utility functions: formatTime for mm:ss display and GLOBAL_PLAY_EVENT constant for multi-instance coordination',
    },
    {
      name: 'index.ts',
      description:
        'Barrel export file re-exporting the compound component and all public types',
    },
  ],
  targetPath: 'src/components',

  // ── Compound Component ────────────────────────────────
  rootComponent: 'AudioPlayer',
  subComponents: [
    {
      name: 'Playlist',
      fileName: 'AudioPlaylist.tsx',
      description:
        'Container that renders a scrollable list of AudioPlayer.Track children and automatically builds the internal playlist state.',
      props: [
        {
          name: 'children',
          type: 'React.ReactNode',
          required: true,
          description: 'AudioPlayer.Track elements that define the playlist',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the playlist container',
        },
      ],
    },
    {
      name: 'Track',
      fileName: 'AudioPlaylist.tsx',
      description:
        'Individual track item in the playlist. Displays poster, title, artist, and an active indicator when playing.',
      props: [
        {
          name: 'src',
          type: 'string',
          required: true,
          description: 'Audio source URL (supports MP3, WAV, OGG, and HLS .m3u8)',
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'Track title displayed in the playlist and track info',
        },
        {
          name: 'artist',
          type: 'string',
          required: false,
          description: 'Artist name displayed below the track title',
        },
        {
          name: 'poster',
          type: 'string',
          required: false,
          description: 'URL for cover art image displayed in the playlist and track info',
        },
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the track row',
        },
      ],
    },
    {
      name: 'TrackInfo',
      fileName: 'AudioTrackInfo.tsx',
      description:
        'Displays metadata for the currently active track including poster artwork, title, and artist.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the track info container',
        },
      ],
    },
    {
      name: 'Controls',
      fileName: 'AudioControls.tsx',
      description:
        'Flex container that wraps control buttons (PlayPause, Next, Previous) and the time display.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the controls container',
        },
      ],
    },
    {
      name: 'PlayPause',
      fileName: 'AudioControls.tsx',
      description:
        'Circular button that toggles play/pause state. Disabled when the playlist is empty.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the button',
        },
      ],
    },
    {
      name: 'Next',
      fileName: 'AudioControls.tsx',
      description: 'Button to skip to the next track in the playlist.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the button',
        },
      ],
    },
    {
      name: 'Previous',
      fileName: 'AudioControls.tsx',
      description:
        'Button to skip to the previous track, or restart the current track if past 3 seconds.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the button',
        },
      ],
    },
    {
      name: 'Progress',
      fileName: 'AudioProgress.tsx',
      description:
        'Alias for Seek. Interactive progress bar with drag-to-seek, buffered indicator, and hover thumb.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the progress bar container',
        },
      ],
    },
    {
      name: 'Seek',
      fileName: 'AudioProgress.tsx',
      description:
        'Interactive slider for seeking through the current track. Supports pointer drag, keyboard focus, and ARIA slider attributes.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the seek bar container',
        },
      ],
    },
    {
      name: 'Time',
      fileName: 'AudioControls.tsx',
      description:
        'Displays current playback time and total duration in mm:ss format.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the time display',
        },
      ],
    },
    {
      name: 'Volume',
      fileName: 'AudioVolume.tsx',
      description:
        'Slider control for adjusting playback volume from 0 to 100, integrated with the Slider component.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the volume container',
        },
      ],
    },
    {
      name: 'Mute',
      fileName: 'AudioVolume.tsx',
      description:
        'Toggle button that mutes/unmutes audio, with icon reflecting the current mute state.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the mute button',
        },
      ],
    },
    {
      name: 'Rate',
      fileName: 'AudioRate.tsx',
      description:
        'Popover button showing current playback rate. Opens a dropdown to select from preset speeds (0.5x to 2x).',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the rate trigger',
        },
      ],
    },
    {
      name: 'Loading',
      fileName: 'AudioStatus.tsx',
      description:
        'Conditionally rendered loading spinner shown while audio is buffering or fetching.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the loading indicator',
        },
      ],
    },
    {
      name: 'Error',
      fileName: 'AudioStatus.tsx',
      description:
        'Conditionally rendered error alert with destructive styling when playback fails.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the error alert',
        },
      ],
    },
    {
      name: 'Buffer',
      fileName: 'AudioStatus.tsx',
      description: 'Alias for Loading. Shows a buffering indicator during loading states.',
      props: [
        {
          name: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes for the buffer indicator',
        },
      ],
    },
  ],
  hooks: ['useAudioPlayer', 'useAudioPlayerState', 'useAudioPlayerActions'],

  // ── Props ─────────────────────────────────────────────
  rootProps: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description:
        'AudioPlayer sub-components (Playlist, TrackInfo, Controls, Progress, Volume, Rate, etc.) composing the full player UI',
    },
    {
      name: 'defaultVolume',
      type: 'number',
      required: false,
      defaultValue: '1',
      description: 'Initial volume level from 0 to 1',
    },
    {
      name: 'allowMultiple',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description:
        'When false (default), playing this player pauses all other AudioPlayer instances on the page via a global event',
    },
    {
      name: 'autoPlayNext',
      type: 'boolean',
      required: false,
      defaultValue: 'true',
      description: 'When true, automatically advances to the next track when the current one ends',
    },
    {
      name: 'loopPlaylist',
      type: 'boolean',
      required: false,
      defaultValue: 'false',
      description: 'When true, loops back to the first track after the last track ends',
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
      name: 'onEnded',
      type: '() => void',
      required: false,
      description: 'Callback fired when the current track finishes playing',
    },
    {
      name: 'onTrackChange',
      type: '(index: number, track: Track) => void',
      required: false,
      description: 'Callback fired when the active track changes',
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
      description: 'Whether audio is currently playing',
    },
    {
      name: 'currentTrack',
      prop: 'currentTrack',
      isBoolean: false,
      description: 'The currently active Track object from the playlist',
    },
    {
      name: 'volume',
      prop: 'volume',
      isBoolean: false,
      defaultValue: '1',
      description: 'Current playback volume level from 0 to 1',
    },
    {
      name: 'isMuted',
      prop: 'isMuted',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the audio output is muted',
    },
    {
      name: 'playbackRate',
      prop: 'playbackRate',
      isBoolean: false,
      defaultValue: '1',
      description: 'Current playback speed multiplier',
    },
    {
      name: 'isLoading',
      prop: 'isLoading',
      isBoolean: true,
      defaultValue: 'false',
      description: 'Whether the audio is buffering or fetching data',
    },
    {
      name: 'error',
      prop: 'error',
      isBoolean: false,
      description: 'Error object when playback fails',
    },
  ],

  // ── Events ────────────────────────────────────────────
  events: [
    {
      name: 'onPlay',
      signature: '() => void',
      description: 'Fired when audio playback begins',
    },
    {
      name: 'onPause',
      signature: '() => void',
      description: 'Fired when audio playback pauses',
    },
    {
      name: 'onEnded',
      signature: '() => void',
      description: 'Fired when the current track reaches its end',
    },
    {
      name: 'onTrackChange',
      signature: '(index: number, track: Track) => void',
      description: 'Fired when the active track index changes programmatically or via user interaction',
    },
    {
      name: 'onClick (Track)',
      signature: '(event: React.MouseEvent<HTMLDivElement>) => void',
      description: 'Fired when a track in the playlist is clicked to start playback',
    },
    {
      name: 'onKeyDown (Root)',
      signature: '(event: React.KeyboardEvent<HTMLDivElement>) => void',
      description:
        'Root handles Space (play/pause), ArrowLeft/Right (seek 5s), ArrowUp/Down (volume), N/P (next/previous)',
    },
  ],

  // ── Accessibility ─────────────────────────────────────
  a11y: {
    role: 'region',
    attributes: [
      {
        name: 'aria-label',
        description: 'Set to "Audio Player" on the root div to identify the component for screen readers',
        managedByComponent: true,
      },
      {
        name: 'aria-label (PlayPause)',
        description: 'Dynamically set to "Play" or "Pause" based on the current playback state',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Next)',
        description: 'Set to "Next Track" on the next button',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Previous)',
        description: 'Set to "Previous Track" on the previous button',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Mute)',
        description: 'Dynamically set to "Mute" or "Unmute" based on mute state',
        managedByComponent: true,
      },
      {
        name: 'aria-label (Loading)',
        description: 'Set to "Loading" on the loading spinner for screen reader announcement',
        managedByComponent: true,
      },
      {
        name: 'role (Seek)',
        description: 'Set to "slider" on the seek bar with aria-valuemin, aria-valuemax, and aria-valuenow',
        managedByComponent: true,
      },
      {
        name: 'role (Track)',
        description: 'Set to "button" on playlist track rows with tabIndex for keyboard accessibility',
        managedByComponent: true,
      },
    ],
    keyboardInteractions: [
      {
        key: 'Space',
        behavior: 'Toggles play/pause when focus is on the root element (ignored when inside input/textarea)',
      },
      {
        key: 'ArrowLeft',
        behavior: 'Seeks backward 5 seconds',
      },
      {
        key: 'ArrowRight',
        behavior: 'Seeks forward 5 seconds',
      },
      {
        key: 'ArrowUp',
        behavior: 'Increases volume by 10%',
      },
      {
        key: 'ArrowDown',
        behavior: 'Decreases volume by 10%',
      },
      {
        key: 'n',
        behavior: 'Skips to the next track in the playlist',
      },
      {
        key: 'p',
        behavior: 'Skips to the previous track in the playlist',
      },
    ],
    focusManagement:
      'The root element is focusable (tabIndex={0}) and captures keyboard events for global shortcuts. Playlist track rows are focusable buttons. The seek bar has tabIndex={0} and supports keyboard focus.',
    wcagLevel: 'AA',
    notes:
      'All control buttons have explicit aria-labels. The seek slider exposes aria-valuemin, aria-valuemax, and aria-valuenow. Poster images have alt text derived from track titles. Error alerts use role="alert".',
  },

  // ── Dependencies ──────────────────────────────────────
  npmDependencies: [{ name: 'clsx' }, { name: 'lucide-react' }, { name: 'hls.js' }],
  registryDependencies: [
    {
      slug: 'button',
      reason:
        'AudioPlayer.PlayPause, Next, Previous, and Mute sub-components render Button elements for consistent styling and accessibility',
    },
    {
      slug: 'popover',
      reason: 'AudioPlayer.Rate uses Popover for the playback speed dropdown menu',
    },
    {
      slug: 'slider',
      reason: 'AudioPlayer.Volume uses Slider for the volume control input',
    },
  ],
  reactPeerDependency: '>=18.0.0',

  // ── Peer Suggestions ──────────────────────────────────
  peerComponents: [
    {
      slug: 'card',
      reason: 'AudioPlayer is commonly placed inside a Card for a self-contained music player widget',
    },
    {
      slug: 'typography',
      reason: 'Typography components can style track titles, artist names, and playlist headings',
    },
    {
      slug: 'video-player',
      reason: 'Media applications often combine audio and video players with shared playlists',
    },
    {
      slug: 'tooltip',
      reason: 'Icon-only control buttons benefit from tooltips describing their action on hover',
    },
  ],

  // ── Examples ──────────────────────────────────────────
  examples: [
    {
      title: 'Basic Single Track',
      description: 'Minimal audio player with a single track, controls, progress, and volume.',
      code: `import { AudioPlayer } from 'vayu-ui';

export default function BasicAudioDemo() {
  return (
    <AudioPlayer>
      <AudioPlayer.Playlist>
        <AudioPlayer.Track
          src="/audio/song.mp3"
          title="Midnight City"
          artist="M83"
          poster="/covers/midnight-city.jpg"
        />
      </AudioPlayer.Playlist>
      <AudioPlayer.TrackInfo />
      <AudioPlayer.Progress />
      <AudioPlayer.Controls>
        <div className="flex items-center gap-2">
          <AudioPlayer.Previous />
          <AudioPlayer.PlayPause />
          <AudioPlayer.Next />
          <AudioPlayer.Time />
        </div>
      </AudioPlayer.Controls>
      <div className="flex items-center gap-2 px-4 pb-3">
        <AudioPlayer.Mute />
        <AudioPlayer.Volume />
        <AudioPlayer.Rate />
      </div>
    </AudioPlayer>
  );
}`,
      tags: ['basic', 'single-track', 'controls'],
    },
    {
      title: 'Playlist Player',
      description: 'Multi-track playlist with track metadata and auto-play next.',
      code: `import { AudioPlayer } from 'vayu-ui';

const tracks = [
  { src: '/audio/track1.mp3', title: 'Track One', artist: 'Artist A', poster: '/cover1.jpg' },
  { src: '/audio/track2.mp3', title: 'Track Two', artist: 'Artist B', poster: '/cover2.jpg' },
  { src: '/audio/track3.mp3', title: 'Track Three', artist: 'Artist C', poster: '/cover3.jpg' },
];

export default function PlaylistDemo() {
  return (
    <AudioPlayer loopPlaylist>
      <div className="flex flex-col sm:flex-row">
        <AudioPlayer.Playlist className="max-h-64">
          {tracks.map((t) => (
            <AudioPlayer.Track key={t.src} {...t} />
          ))}
        </AudioPlayer.Playlist>
        <div className="flex-1 p-4">
          <AudioPlayer.TrackInfo />
          <AudioPlayer.Progress />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <AudioPlayer.Previous />
              <AudioPlayer.PlayPause />
              <AudioPlayer.Next />
            </div>
            <AudioPlayer.Time />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <AudioPlayer.Mute />
            <AudioPlayer.Volume />
            <AudioPlayer.Rate />
          </div>
        </div>
      </div>
      <AudioPlayer.Loading />
      <AudioPlayer.Error />
    </AudioPlayer>
  );
}`,
      tags: ['playlist', 'multi-track', 'loop'],
    },
    {
      title: 'HLS Stream Player',
      description: 'Live audio stream using HLS (.m3u8) with hls.js integration.',
      code: `import { AudioPlayer } from 'vayu-ui';

export default function HLSAudioDemo() {
  return (
    <AudioPlayer>
      <AudioPlayer.Playlist>
        <AudioPlayer.Track
          src="https://example.com/live/stream.m3u8"
          title="Live Radio"
          artist="FM 101.5"
        />
      </AudioPlayer.Playlist>
      <AudioPlayer.TrackInfo />
      <AudioPlayer.Progress />
      <AudioPlayer.Controls>
        <AudioPlayer.PlayPause />
        <AudioPlayer.Time />
      </AudioPlayer.Controls>
      <div className="flex items-center gap-2 px-4 pb-3">
        <AudioPlayer.Mute />
        <AudioPlayer.Volume />
      </div>
      <AudioPlayer.Loading />
      <AudioPlayer.Error />
    </AudioPlayer>
  );
}`,
      tags: ['hls', 'streaming', 'live', 'm3u8'],
    },
    {
      title: 'Controlled with Callbacks',
      description: 'Controlled player with event callbacks for tracking playback state.',
      code: `import { AudioPlayer } from 'vayu-ui';

export default function ControlledAudioDemo() {
  return (
    <AudioPlayer
      defaultVolume={0.7}
      allowMultiple
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
      onEnded={() => console.log('Ended')}
      onTrackChange={(index, track) => console.log('Now playing:', track.title)}
    >
      <AudioPlayer.Playlist>
        <AudioPlayer.Track src="/audio/intro.mp3" title="Intro" artist="Band" />
        <AudioPlayer.Track src="/audio/main.mp3" title="Main Theme" artist="Band" />
      </AudioPlayer.Playlist>
      <AudioPlayer.Progress />
      <AudioPlayer.Controls>
        <AudioPlayer.Previous />
        <AudioPlayer.PlayPause />
        <AudioPlayer.Next />
        <AudioPlayer.Time />
      </AudioPlayer.Controls>
      <div className="flex items-center gap-2 px-4 pb-3">
        <AudioPlayer.Mute />
        <AudioPlayer.Volume />
        <AudioPlayer.Rate />
      </div>
    </AudioPlayer>
  );
}`,
      tags: ['controlled', 'callbacks', 'events'],
    },
  ],

  // ── Anti-patterns ─────────────────────────────────────
  doNot: [
    {
      title: 'Using sub-components outside AudioPlayer',
      bad: '<div><AudioPlayer.PlayPause /></div>',
      good: '<AudioPlayer><AudioPlayer.Controls><AudioPlayer.PlayPause /></AudioPlayer.Controls></AudioPlayer>',
      reason:
        'All sub-components consume the AudioPlayerContext. Using them outside the root throws an error because the context is undefined.',
    },
    {
      title: 'Forgetting the src prop on Track',
      bad: '<AudioPlayer.Track title="Song" artist="Artist" />',
      good: '<AudioPlayer.Track src="/audio/song.mp3" title="Song" artist="Artist" />',
      reason:
        'The src prop is required for playback. Without it, the track is added to the playlist but cannot be played.',
    },
    {
      title: 'Relying on Space key inside forms',
      bad: '<form><AudioPlayer>...</AudioPlayer><input type="text" /></form>',
      good: 'Place AudioPlayer outside forms, or disable global keyboard handling by wrapping inputs appropriately.',
      reason:
        'The root element listens for Space to toggle play/pause, which may conflict with form inputs unless focus is managed carefully.',
    },
    {
      title: 'Passing invalid children to Playlist',
      bad: '<AudioPlayer.Playlist><div>Not a track</div></AudioPlayer.Playlist>',
      good: '<AudioPlayer.Playlist><AudioPlayer.Track src="..." /></AudioPlayer.Playlist>',
      reason:
        'Playlist uses React.Children.forEach to collect only AudioPlayer.Track elements. Other children are ignored and will not appear in the playlist.',
    },
  ],
};
