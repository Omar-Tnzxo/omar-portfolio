import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Validate environment variables
if (!isSupabaseConfigured()) {
  console.warn('⚠️ Supabase is not configured. Using fallback to static data.');
  console.info('ℹ️ To enable dynamic portfolio, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local');
}

// Create Supabase client with dummy values if not configured
// This prevents errors when Supabase is not set up
const dummyUrl = 'https://placeholder.supabase.co';
const dummyKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Create Supabase client with session persistence
export const supabase: SupabaseClient = createClient(
  supabaseUrl || dummyUrl,
  supabaseAnonKey || dummyKey,
  {
    auth: {
      persistSession: true, // Enable session persistence
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'x-application-name': 'omar-portfolio',
      },
    },
  }
);

// Storage bucket name for portfolio images
export const PORTFOLIO_BUCKET = 'portfolio-images';

// Helper function to get public URL for storage files
export const getPublicUrl = (bucket: string, path: string): string => {
  if (!isSupabaseConfigured()) {
    return path; // Return original path if Supabase not configured
  }
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Helper function to upload file to storage
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) {
      return { url: null, error };
    }

    const publicUrl = getPublicUrl(bucket, data.path);
    return { url: publicUrl, error: null };
  } catch (error) {
    return { url: null, error: error as Error };
  }
};

// Helper function to delete file from storage
export const deleteFile = async (
  bucket: string,
  path: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return { success: false, error };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// Export configured status
export const SUPABASE_ENABLED = isSupabaseConfigured();

export default supabase;
