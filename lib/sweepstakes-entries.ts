// Sweepstakes entry management
// Using Supabase for persistence

import { supabase } from './supabase';

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
 * Load all entries from Supabase
 */
async function loadEntries(): Promise<SweepstakesEntry[]> {
  if (!supabase) {
    console.warn('Supabase not configured - returning empty entries');
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('davidoff_sweepstakes_entries')
      .select('*')
      .order('entry_date', { ascending: false });
    
    if (error) {
      console.error('Error loading entries from Supabase:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    // Convert date strings back to Date objects and map field names
    return data.map((entry) => ({
      id: entry.id,
      firstName: entry.first_name,
      lastName: entry.last_name,
      email: entry.email,
      phone: entry.phone,
      dateOfBirth: entry.date_of_birth,
      address: entry.address,
      city: entry.city,
      state: entry.state,
      zipCode: entry.zip_code,
      agreeToRules: entry.agree_to_rules,
      agreeToEmails: entry.agree_to_emails,
      emailVerified: entry.email_verified || false,
      entryDate: new Date(entry.entry_date),
      ipAddress: entry.ip_address
    }));
  } catch (error) {
    console.error('Error loading entries from Supabase:', error);
    return [];
  }
}


/**
 * Add a new sweepstakes entry
 */
export async function addEntry(entry: Omit<SweepstakesEntry, 'id' | 'entryDate'>): Promise<SweepstakesEntry> {
  if (!supabase) {
    throw new Error('Supabase not configured');
  }
  
  const newEntry: SweepstakesEntry = {
    ...entry,
    id: generateEntryId(),
    entryDate: new Date(),
  };
  
  try {
    const { error } = await supabase
      .from('davidoff_sweepstakes_entries')
      .insert([{
        id: newEntry.id,
        first_name: newEntry.firstName,
        last_name: newEntry.lastName,
        email: newEntry.email,
        phone: newEntry.phone,
        date_of_birth: newEntry.dateOfBirth,
        address: newEntry.address,
        city: newEntry.city,
        state: newEntry.state,
        zip_code: newEntry.zipCode,
        agree_to_rules: newEntry.agreeToRules,
        agree_to_emails: newEntry.agreeToEmails,
        email_verified: false,
        entry_date: newEntry.entryDate.toISOString(),
        ip_address: newEntry.ipAddress
      }]);
    
    if (error) {
      console.error('Error saving entry to Supabase:', error);
      throw error;
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
  if (!supabase) {
    console.warn('Supabase not configured - cannot mark email as verified');
    return;
  }
  
  try {
    const { error } = await supabase
      .from('davidoff_sweepstakes_entries')
      .update({ email_verified: true })
      .eq('email', email.toLowerCase());
    
    if (error) {
      console.error('Error marking email as verified in Supabase:', error);
      throw error;
    }
    
    console.log('Email marked as verified:', email);
  } catch (error) {
    console.error('Error marking email as verified:', error);
    throw error;
  }
}

/**
 * Generate unique entry ID
 */
function generateEntryId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `entry_${timestamp}_${random}`;
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

