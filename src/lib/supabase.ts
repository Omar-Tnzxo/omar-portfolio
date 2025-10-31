import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl) {
  console.warn('⚠️ Supabase URL is not configured');
}

if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase Anon Key is not configured');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth persistence for public portfolio
  },
  global: {
    headers: {
      'x-application-name': 'omar-portfolio',
    },
  },
});

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

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
