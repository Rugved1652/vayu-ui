/**
 * Google Analytics 4 Utility
 * Type-safe helper for tracking custom events
 */

// GA4 Measurement ID
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Type for GA4 event parameters
interface GA4EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a custom event in GA4
 * @param eventName - GA4 event name (use snake_case)
 * @param params - Event parameters
 * @example
 * trackEvent('component_view', { component_name: 'Button', category: 'inputs' })
 * trackEvent('demo_interaction', { component: 'Modal', action: 'open' })
 */
export function trackEvent(eventName: string, params?: GA4EventParams): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_ID) {
    // Silently fail in non-browser environments or when GA is not loaded
    return;
  }

  window.gtag('event', eventName, {
    ...params,
    send_to: GA_ID,
  });

  // Debug log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GA4] Event: ${eventName}`, params);
  }
}

/**
 * Predefined event names for Vayu UI docs
 * Use these to maintain consistency across the app
 */
export const AnalyticsEvents = {
  // Component documentation
  COMPONENT_VIEW: 'component_view',
  COMPONENT_COPY_CODE: 'component_copy_code',
  COMPONENT_INSTALL: 'component_install',

  // Demo interactions
  DEMO_INTERACTION: 'demo_interaction',
  DEMO_EXPAND: 'demo_expand',

  // Navigation
  NAV_SEARCH: 'nav_search',
  NAV_CLICK: 'nav_click',

  // Engagement
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
} as const;

/**
 * Track component page view
 * @param componentName - Name of the component (e.g., 'Button', 'Modal')
 * @param category - Component category (e.g., 'inputs', 'overlays')
 */
export function trackComponentView(componentName: string, category?: string): void {
  trackEvent(AnalyticsEvents.COMPONENT_VIEW, {
    component_name: componentName,
    component_category: category || 'unknown',
  });
}

/**
 * Track demo interaction
 * @param componentName - Component being demoed
 * @param action - Action performed (e.g., 'click', 'hover', 'open')
 */
export function trackDemoInteraction(componentName: string, action: string): void {
  trackEvent(AnalyticsEvents.DEMO_INTERACTION, {
    component_name: componentName,
    action,
  });
}

/**
 * Track navigation search
 * @param searchTerm - What the user searched for
 * @param resultCount - Number of results shown
 */
export function trackSearch(searchTerm: string, resultCount?: number): void {
  trackEvent(AnalyticsEvents.NAV_SEARCH, {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

/**
 * Track scroll depth milestone
 * @param depth - Scroll depth percentage (25, 50, 75, 90, 100)
 * @param pagePath - Current page path
 */
export function trackScrollDepth(depth: number, pagePath?: string): void {
  trackEvent(AnalyticsEvents.SCROLL_DEPTH, {
    depth_percent: depth,
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}
