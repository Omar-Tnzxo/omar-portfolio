import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService, type AdminUser } from '../services/auth-service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { user } = await authService.getSession();
      setUser(user);
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#915EFF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
