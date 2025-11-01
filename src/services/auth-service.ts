// Admin Authentication Service
import { supabase } from '../lib/supabase';

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Sign in admin user
 */
export const signIn = async (
  email: string,
  password: string
): Promise<{ user: AdminUser | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user || !data.session) {
      throw new Error('فشل في تسجيل الدخول - لم يتم إرجاع بيانات المستخدم');
    }

    // Store additional auth indicators for quick checks
    // Supabase handles session storage automatically via localStorage
    localStorage.setItem('admin_authenticated', 'true');
    localStorage.setItem('admin_email', data.user.email || '');
    localStorage.setItem('admin_session_expires', data.session.expires_at?.toString() || '');

    return {
      user: {
        id: data.user.id,
        email: data.user.email || '',
        role: data.user.user_metadata?.role || 'admin',
      },
      error: null,
    };
  } catch (error) {
    // Clear any partial auth data
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_session_expires');
    
    return {
      user: null,
      error: error as Error,
    };
  }
};

/**
 * Sign out admin user
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear all auth-related data
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_email');
    localStorage.removeItem('admin_session_expires');
    // Also clear old keys for backwards compatibility
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
};

/**
 * Get current session
 */
export const getSession = async (): Promise<{ user: AdminUser | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (!data.session?.user) {
      return { user: null, error: null };
    }

    return {
      user: {
        id: data.session.user.id,
        email: data.session.user.email || '',
        role: data.session.user.user_metadata?.role || 'admin',
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error as Error,
    };
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const { user } = await getSession();
  return user !== null;
};

/**
 * Auth state change listener
 */
export const onAuthStateChange = (callback: (user: AdminUser | null) => void) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email || '',
        role: session.user.user_metadata?.role || 'admin',
      });
    } else {
      callback(null);
    }
  });
};

export const authService = {
  signIn,
  signOut,
  getSession,
  isAuthenticated,
  onAuthStateChange,
};

export default authService;
