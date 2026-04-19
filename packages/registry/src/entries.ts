import type { ComponentRegistryEntry, HookRegistryEntry, RegistryEntry } from './types.js';

import { accordionEntry } from './components/accordion.js';
import { affixEntry } from './components/affix.js';
import { alertEntry } from './components/alert.js';
import { animationEntry } from './components/animation.js';
import { aspectratioEntry } from './components/aspectratio.js';
import { avatarEntry } from './components/avatar.js';
import { avatarGroupEntry } from './components/avatargroup.js';
import { badgeEntry } from './components/badge.js';
import { breadcrumbEntry } from './components/breadcrumb.js';
import { buttonEntry } from './components/button.js';
import { buttonGroupEntry } from './components/button-group.js';
import { cardEntry } from './components/card.js';
import { carouselEntry } from './components/carousel.js';
import { checkboxEntry } from './components/checkbox.js';
import { collapsibleEntry } from './components/collapsible.js';
import { colorPickerEntry } from './components/colorpicker.js';
import { commandBoxEntry } from './components/commandbox.js';
import { datePickerEntry } from './components/date-picker.js';
import { dividerEntry } from './components/divider.js';
import { draggableEntry } from './components/draggable.js';
import { drawerEntry } from './components/drawer.js';
import { fileUploadEntry } from './components/fileupload.js';
import { floatingDockEntry } from './components/floatingdock.js';
import { footerEntry } from './components/footer.js';
import { gridLayoutEntry } from './components/grid-layout.js';
import { hoverCardEntry } from './components/hover-card.js';
import { marqueeEntry } from './components/marquee.js';
import { menubarEntry } from './components/menubar.js';
import { modalEntry } from './components/modal.js';
import { navbarEntry } from './components/navbar.js';
import { otpInputEntry } from './components/otp-input.js';
import { paginationEntry } from './components/pagination.js';
import { popoverEntry } from './components/popover.js';
import { radioGroupEntry } from './components/radiogroup.js';
import { rateEntry } from './components/rate.js';
import { resizablePaneEntry } from './components/resizablepane.js';
import { sidebarEntry } from './components/sidebar.js';
import { skeletonEntry } from './components/skeleton.js';
import { sliderEntry } from './components/slider.js';
import { spinnerEntry } from './components/spinner.js';
import { stepperEntry } from './components/stepper.js';
import { switchEntry } from './components/switch.js';
import { tabEntry } from './components/tab.js';
import { tableEntry } from './components/table.js';
import { textAreaEntry } from './components/textarea.js';
import { textInputEntry } from './components/text-input.js';
import { toasterEntry } from './components/toaster.js';
import { tooltipEntry } from './components/tooltip.js';
import { tourEntry } from './components/tour.js';
import { typographyEntry } from './components/typography.js';

import { useBatteryStatusEntry } from './hooks/use-battery-status.js';
import { useConfirmExitEntry } from './hooks/use-confirm-exit.js';
import { useCopyToClipboardEntry } from './hooks/use-copy-to-clipboard.js';
import { useDebounceEntry } from './hooks/use-debounce.js';
import { useDeviceOSEntry } from './hooks/use-device-os.js';
import { useElementPositionEntry } from './hooks/use-element-position.js';
import { useHoverEntry } from './hooks/use-hover.js';
import { useIdleEntry } from './hooks/use-idle.js';
import { useIndexedDBEntry } from './hooks/use-indexed-db.js';
import { useIntervalWhenEntry } from './hooks/use-interval-when.js';
import { useKeyPressEntry } from './hooks/use-key-press.js';
import { useListEntry } from './hooks/use-list.js';
import { useLockBodyScrollEntry } from './hooks/use-lock-body-scroll.js';
import { useLocalStorageEntry } from './hooks/use-local-storage.js';
import { useMapEntry } from './hooks/use-map.js';
import { useMeasureEntry } from './hooks/use-measure.js';
import { useMediaQueryEntry } from './hooks/use-media-query.js';
import { useMouseTrackEntry } from './hooks/use-mouse-track.js';
import { useNetworkStatusEntry } from './hooks/use-network-status.js';
import { useOnClickOutsideEntry } from './hooks/use-on-click-outside.js';
import { usePageLeaveEntry } from './hooks/use-page-leave.js';
import { usePermissionEntry } from './hooks/use-permission.js';
import { usePreviousStateEntry } from './hooks/use-previous-state.js';
import { useQueueEntry } from './hooks/use-queue.js';
import { useRenderCountEntry } from './hooks/use-render-count.js';
import { useScrollPositionEntry } from './hooks/use-scroll-position.js';
import { useSetEntry } from './hooks/use-set.js';
import { useThrottleEntry } from './hooks/use-throttle.js';
import { useTimeoutEntry } from './hooks/use-timeout.js';
import { useVisibilityChangeEntry } from './hooks/use-visibility-change.js';
import { useWindowSizeEntry } from './hooks/use-window-size.js';

export const componentEntries: ComponentRegistryEntry[] = [
  accordionEntry, affixEntry, alertEntry, animationEntry, aspectratioEntry,
  avatarEntry, avatarGroupEntry, badgeEntry, breadcrumbEntry, buttonEntry,
  buttonGroupEntry, cardEntry, carouselEntry, checkboxEntry, collapsibleEntry,
  colorPickerEntry, commandBoxEntry, datePickerEntry, dividerEntry,
  draggableEntry, drawerEntry, fileUploadEntry, floatingDockEntry,
  footerEntry, gridLayoutEntry, hoverCardEntry, marqueeEntry, menubarEntry,
  modalEntry, navbarEntry, otpInputEntry, paginationEntry, popoverEntry,
  radioGroupEntry, rateEntry, resizablePaneEntry, sidebarEntry,
  skeletonEntry, sliderEntry, spinnerEntry, stepperEntry, switchEntry,
  tabEntry, tableEntry, textAreaEntry, textInputEntry, toasterEntry,
  tooltipEntry, tourEntry, typographyEntry,
];

export const hookEntries: HookRegistryEntry[] = [
  useBatteryStatusEntry, useConfirmExitEntry, useCopyToClipboardEntry,
  useDebounceEntry, useDeviceOSEntry, useElementPositionEntry,
  useHoverEntry, useIdleEntry, useIndexedDBEntry, useIntervalWhenEntry,
  useKeyPressEntry, useListEntry, useLockBodyScrollEntry,
  useLocalStorageEntry, useMapEntry, useMeasureEntry, useMediaQueryEntry,
  useMouseTrackEntry, useNetworkStatusEntry, useOnClickOutsideEntry,
  usePageLeaveEntry, usePermissionEntry, usePreviousStateEntry,
  useQueueEntry, useRenderCountEntry, useScrollPositionEntry,
  useSetEntry, useThrottleEntry, useTimeoutEntry,
  useVisibilityChangeEntry, useWindowSizeEntry,
];

export const allEntries: RegistryEntry[] = [
  ...componentEntries,
  ...hookEntries,
];
