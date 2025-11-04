// Analytics tracking for PDF downloads and sweepstakes entries
// Using Supabase for persistence

import { supabase } from './supabase';

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
  if (!supabase) {
    console.warn('Supabase not configured - returning empty analytics data');
    return [];
  }
  
  try {
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
    
    // Convert timestamp strings back to Date objects
    return data.map((event) => ({
      ...event,
      timestamp: new Date(event.timestamp)
    }));
  } catch (error) {
    console.error('Error loading analytics events from Supabase:', error);
    return [];
  }
}

export async function trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
  const analyticsEvent: AnalyticsEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  };
  
  if (!supabase) {
    console.warn('Supabase not configured - analytics event not saved:', analyticsEvent);
    return;
  }
  
  try {
    const { error } = await supabase
      .from('davidoff_analytics_events')
      .insert([{
        id: analyticsEvent.id,
        type: analyticsEvent.type,
        timestamp: analyticsEvent.timestamp.toISOString(),
        user_agent: analyticsEvent.userAgent,
        ip_address: analyticsEvent.ipAddress,
        metadata: analyticsEvent.metadata
      }]);
    
    if (error) {
      console.error('Error saving analytics event to Supabase:', error);
    } else {
      console.log('Analytics event saved:', analyticsEvent);
    }
  } catch (error) {
    console.error('Error saving analytics event to Supabase:', error);
  }
}

export async function getAnalyticsSummary() {
  const now = new Date();
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Load events from Redis instead of in-memory array
  const analyticsEvents = await loadAnalyticsEvents();
  const recentEvents = analyticsEvents.filter(event => event.timestamp >= last30Days);

  // Individual recipe downloads
  const individualRecipeDownloads = recentEvents.filter(
    event => event.type === 'pdf_download' && event.metadata.pdfType === 'individual_recipe'
  );

  // Full recipe book downloads
  const fullRecipeBookDownloads = recentEvents.filter(
    event => event.type === 'pdf_download' && event.metadata.pdfType === 'full_recipe_book'
  );

  // Sweepstakes entries
  const sweepstakesEntries = recentEvents.filter(
    event => event.type === 'sweepstakes_entry'
  );

  // Email verifications
  const emailVerifications = recentEvents.filter(
    event => event.type === 'email_verification'
  );

  // Recipe popularity (by individual downloads)
  const recipeStats = individualRecipeDownloads.reduce((acc, event) => {
    const recipeId = event.metadata.recipeId;
    const recipeName = event.metadata.recipeName;
    const winery = event.metadata.winery;
    
    if (recipeId && recipeName && winery) {
      if (!acc[recipeId]) {
        acc[recipeId] = {
          recipeId,
          recipeName,
          winery,
          downloads: 0,
          lastDownloaded: null,
        };
      }
      acc[recipeId].downloads++;
      if (!acc[recipeId].lastDownloaded || event.timestamp > acc[recipeId].lastDownloaded!) {
        acc[recipeId].lastDownloaded = event.timestamp;
      }
    }
    return acc;
  }, {} as Record<number, { recipeId: number; recipeName: string; winery: string; downloads: number; lastDownloaded: Date | null }>);

  return {
    summary: {
      totalSweepstakesEntries: sweepstakesEntries.length,
      totalFullRecipeBookDownloads: fullRecipeBookDownloads.length,
      totalIndividualRecipeDownloads: individualRecipeDownloads.length,
      totalEmailVerifications: emailVerifications.length,
      conversionRate: sweepstakesEntries.length > 0 
        ? (fullRecipeBookDownloads.length / sweepstakesEntries.length * 100).toFixed(1)
        : '0',
    },
    timeframes: {
      last24Hours: {
        sweepstakesEntries: sweepstakesEntries.filter(e => e.timestamp >= last24Hours).length,
        fullRecipeBookDownloads: fullRecipeBookDownloads.filter(e => e.timestamp >= last24Hours).length,
        individualRecipeDownloads: individualRecipeDownloads.filter(e => e.timestamp >= last24Hours).length,
      },
      last7Days: {
        sweepstakesEntries: sweepstakesEntries.filter(e => e.timestamp >= last7Days).length,
        fullRecipeBookDownloads: fullRecipeBookDownloads.filter(e => e.timestamp >= last7Days).length,
        individualRecipeDownloads: individualRecipeDownloads.filter(e => e.timestamp >= last7Days).length,
      },
      last30Days: {
        sweepstakesEntries: sweepstakesEntries.length,
        fullRecipeBookDownloads: fullRecipeBookDownloads.length,
        individualRecipeDownloads: individualRecipeDownloads.length,
      },
    },
    recipeStats: Object.values(recipeStats).sort((a, b) => b.downloads - a.downloads),
    recentEvents: recentEvents.slice(-50).reverse(), // Last 50 events
  };
}

export async function getAllAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const events = await loadAnalyticsEvents();
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

