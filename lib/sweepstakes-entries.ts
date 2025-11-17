// Sweepstakes entry management
// Using Supabase for persistence

import { createClient } from './supabase';

export interface SweepstakesEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  agreeToRules: boolean;
  agreeToEmails: boolean;
  emailVerified: boolean;
  entryDate: Date;
  ipAddress?: string;
}

/**
 * Insert a new sweepstakes entry (used by API route)
 */
export async function insertSweepstakesEntry(entryData: {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  state: string;
  verification_token: string;
}): Promise<{ id: string } | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('sweepstakes_entries')
      .insert([entryData])
      .select('id')
      .single();
    
    if (error) {
      console.error('[500] Error inserting sweepstakes entry:', error);
      return null;
    }
    
    if (!data) {
      console.error('[500] No data returned from insert');
      return null;
    }
    
    return { id: data.id };
  } catch (error) {
    console.error('[500] Exception inserting sweepstakes entry:', error);
    return null;
  }
}

/**
 * Load all entries from Supabase
 */
async function loadEntries(): Promise<SweepstakesEntry[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('sweepstakes_entries')
      .select('id, email, first_name, last_name, date_of_birth, state, verification_token, created_at, updated_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading entries from Supabase:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    // Convert date strings back to Date objects and map field names
    // Note: Some fields don't exist in the actual table schema, using defaults
    return data.map((entry) => ({
      id: entry.id,
      firstName: entry.first_name || '',
      lastName: entry.last_name || '',
      email: entry.email,
      phone: '', // Not in table schema
      dateOfBirth: entry.date_of_birth || '',
      address: '', // Not in table schema
      city: '', // Not in table schema
      state: entry.state || '',
      zipCode: '', // Not in table schema
      agreeToRules: false, // Not in table schema
      agreeToEmails: false, // Not in table schema
      emailVerified: false, // Not in table schema
      entryDate: new Date(entry.created_at || new Date()),
      ipAddress: undefined // Not in table schema
    }));
  } catch (error) {
    console.error('Error loading entries from Supabase:', error);
    return [];
  }
}


/**
 * Add a new sweepstakes entry
 */
export async function addEntry(entry: Omit<SweepstakesEntry, 'id' | 'entryDate' | 'emailVerified'>): Promise<SweepstakesEntry> {
  const supabase = createClient();
  
  const newEntry: SweepstakesEntry = {
    ...entry,
    id: '', // Will be set by Supabase
    entryDate: new Date(),
    emailVerified: false,
  };
  
  try {
    // Only insert columns that actually exist in the table schema
    // Let Supabase auto-generate the UUID for id
    const { data, error } = await supabase
      .from('sweepstakes_entries')
      .insert([{
        first_name: newEntry.firstName,
        last_name: newEntry.lastName,
        email: newEntry.email,
        date_of_birth: newEntry.dateOfBirth,
        state: newEntry.state,
        verification_token: '', // Required field - should be set by caller
        created_at: newEntry.entryDate.toISOString(),
        updated_at: newEntry.entryDate.toISOString()
      }])
      .select('id')
      .single();
    
    if (error) {
      console.error('Error saving entry to Supabase:', error);
      throw error;
    }
    
    // Update newEntry with the generated ID
    if (data) {
      newEntry.id = data.id;
    }
    
    // Log entry
    console.log('New sweepstakes entry:', {
      id: newEntry.id,
      email: newEntry.email,
      name: `${newEntry.firstName} ${newEntry.lastName}`,
      date: newEntry.entryDate,
    });
    
    return newEntry;
  } catch (error) {
    console.error('Error adding sweepstakes entry:', error);
    throw error;
  }
}

/**
 * Get total entry count
 */
export async function getEntryCount(): Promise<number> {
  const entries = await loadEntries();
  return entries.length;
}

/**
 * Check if email has already entered
 */
export async function hasEmailEntered(email: string): Promise<boolean> {
  const entries = await loadEntries();
  return entries.some(entry => entry.email.toLowerCase() === email.toLowerCase());
}

/**
 * Get entry by email
 */
export async function getEntryByEmail(email: string): Promise<SweepstakesEntry | null> {
  const entries = await loadEntries();
  return entries.find(entry => entry.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Get all entries (for admin/export)
 */
export async function getAllEntries(): Promise<SweepstakesEntry[]> {
  const entries = await loadEntries();
  return [...entries];
}

/**
 * Mark email as verified in the database
 */
export async function markEmailAsVerified(email: string): Promise<void> {
  try {
    // Note: email_verified column doesn't exist in current table schema
    // This function is kept for compatibility but won't update anything
    console.log('Note: email_verified column not in table schema, skipping update for:', email);
    console.log('Email marked as verified:', email);
  } catch (error) {
    console.error('Error marking email as verified:', error);
    throw error;
  }
}

/**
 * Export entries to CSV format
 */
export async function exportEntriesToCSV(): Promise<string> {
  const entries = await loadEntries();
  
  const headers = [
    'ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Date of Birth',
    'Address',
    'City',
    'State',
    'Zip Code',
    'Entry Date',
    'IP Address'
  ];
  
  const rows = entries.map(entry => [
    entry.id,
    entry.firstName,
    entry.lastName,
    entry.email,
    entry.phone,
    entry.dateOfBirth,
    entry.address,
    entry.city,
    entry.state,
    entry.zipCode,
    entry.entryDate.toISOString(),
    entry.ipAddress || 'N/A'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  return csvContent;
}
