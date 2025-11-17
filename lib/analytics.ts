// Analytics tracking for PDF downloads and sweepstakes entries
// Using Supabase for persistence

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
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('davidoff_analytics_events')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error loading analytics events from Supabase:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    return data.map((event: any) => ({
      ...event,
      timestamp: new Date(event.timestamp),
    }));
  } catch (error) {
    console.error('Error loading analytics events from Supabase:', error);
    return [];
  }
}

/**
 * Track an analytics event
 */
export async function trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('davidoff_analytics_events')
      .insert([{
        type: event.type,
        timestamp: new Date().toISOString(),
        user_agent: event.userAgent,
        ip_address: event.ipAddress,
        metadata: event.metadata,
      }]);
    
    if (error) {
      console.error('Error tracking analytics event:', error);
    }
  } catch (error) {
    console.error('Error tracking analytics event:', error);
  }
}

/**
 * Get all analytics events
 */
export async function getAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  return loadAnalyticsEvents();
}
