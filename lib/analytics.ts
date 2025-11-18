// Analytics tracking for PDF downloads and sweepstakes entries
// Using Supabase for persistence
// NOTE: Analytics currently disabled - davidoff_analytics_events table not configured

import { createClient } from './supabase';

export interface AnalyticsEvent {
  id: string;
  type: 'pdf_download' | 'sweepstakes_entry' | 'email_verification';
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  metadata: {
    // For PDF downloads
    pdfType?: 'individual_recipe' | 'full_recipe_book';
    recipeId?: number;
    recipeName?: string;
    winery?: string;
    
    // For sweepstakes entries
    email?: string;
    firstName?: string;
    lastName?: string;
    
    // For email verifications
    verificationStatus?: 'success' | 'failed';
  };
}

/**
 * Load all analytics events from Supabase
 */
async function loadAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  console.log('[Analytics] Analytics disabled - davidoff_analytics_events table not configured');
  return [];
}

/**
 * Track an analytics event (currently disabled)
 */
export async function trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  // Analytics tracking disabled - table not configured
  console.log('[Analytics] Event would be tracked:', event.type);
  return;
}

/**
 * Get all analytics events
 */
export async function getAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  return loadAnalyticsEvents();
}
