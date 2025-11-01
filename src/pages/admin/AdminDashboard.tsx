import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  FileText, 
  LogOut, 
  LayoutDashboard,
  PlusCircle,
  Settings 
} from 'lucide-react';
import { authService } from '../../services/auth-service';
import { portfolioApi } from '../../services/portfolio-api';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCategories: 0,
    featuredProjects: 0,
    publishedProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [categories, projects] = await Promise.all([
        portfolioApi.getCategories(),
        portfolioApi.getAllProjects()
      ]);

      setStats({
        totalProjects: projects.length,
        totalCategories: categories.length,
        featuredProjects: projects.filter(p => p.is_featured).length,
        publishedProjects: projects.filter(p => p.is_published).length
      });
    } catch (error) {
      toast.error('فشل في تحميل الإحصائيات');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await authService.signOut();
    if (error) {
      toast.error('فشل تسجيل الخروج');
    } else {
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/admin');
    }
  };

  const statCards = [
    {
      title: 'إجمالي المشاريع',
      value: stats.totalProjects,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/projects'
    },
    {
      title: 'الفئات',
      value: stats.totalCategories,
      icon: FolderOpen,
      color: 'bg-green-500',
      link: '/admin/categories'
    },
    {
      title: 'المميزة',
      value: stats.featuredProjects,
      icon: LayoutDashboard,
      color: 'bg-purple-500',
      link: '/admin/projects?filter=featured'
    },
    {
      title: 'المنشورة',
      value: stats.publishedProjects,
      icon: Settings,
      color: 'bg-orange-500',
      link: '/admin/projects?filter=published'
    }
  ];

  const quickActions = [
    {
      title: 'إضافة مشروع جديد',
      description: 'إنشاء مشروع بورتفوليو جديد',
      icon: PlusCircle,
      link: '/admin/projects/new',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'إدارة الفئات',
      description: 'تعديل فئات البورتفوليو',
      icon: FolderOpen,
      link: '/admin/categories',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'عرض جميع المشاريع',
      description: 'تصفح كل مشاريع البورتفوليو',
      icon: FileText,
      link: '/admin/projects',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={stat.link}>
                  <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {loading ? (
                        <div className="h-8 w-16 bg-white/10 animate-pulse rounded" />
                      ) : (
                        <span className="text-3xl font-bold text-white">{stat.value}</span>
                      )}
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link to={action.link}>
                    <div className={`${action.color} rounded-xl p-6 text-white transition transform hover:scale-105`}>
                      <Icon className="w-8 h-8 mb-3" />
                      <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                      <p className="text-white/80 text-sm">{action.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">خيارات الإدارة</h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
            >
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-white">إدارة جميع المشاريع</span>
            </Link>
            <Link
              to="/admin/categories"
              className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
            >
              <FolderOpen className="w-5 h-5 text-green-400" />
              <span className="text-white">إدارة الفئات</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
