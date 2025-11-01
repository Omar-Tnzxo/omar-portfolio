import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration - get from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  const hasUrl = Boolean(supabaseUrl && supabaseUrl !== '' && !supabaseUrl.includes('placeholder') && !supabaseUrl.includes('your-project'));
  const hasKey = Boolean(supabaseAnonKey && supabaseAnonKey !== '' && !supabaseAnonKey.includes('your-') && supabaseAnonKey.length > 50);
  return hasUrl && hasKey;
};

// Validate and log configuration status
const configured = isSupabaseConfigured();
if (!configured) {
  console.warn('⚠️ Supabase URL is not configured');
  console.warn('⚠️ Supabase Anon Key is not configured');
  console.info('ℹ️ The portfolio will use static fallback data.');
  console.info('ℹ️ To enable dynamic content, configure Supabase in Netlify environment variables.');
}

// Create dummy credentials for fallback mode
const dummyUrl = 'https://fallback.supabase.co';
const dummyKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbGxiYWNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.fallback';

// Create Supabase client with session persistence
export const supabase: SupabaseClient = createClient(
  configured ? supabaseUrl : dummyUrl,
  configured ? supabaseAnonKey : dummyKey,
  {
    auth: {
      persistSession: true, // Enable session persistence in localStorage
      autoRefreshToken: true, // Automatically refresh expired tokens
      detectSessionInUrl: true, // Detect OAuth sessions in URL
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
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
