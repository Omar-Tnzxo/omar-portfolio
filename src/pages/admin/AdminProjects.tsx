import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  ArrowLeft,
  Search
} from 'lucide-react';
import { portfolioApi } from '../../services/portfolio-api';
import { PortfolioProject } from '../../types/portfolio';
import { toast } from 'sonner';

const AdminProjects = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'featured'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, filterStatus]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await portfolioApi.getAllProjects();
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.client.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus === 'published') {
      filtered = filtered.filter(p => p.is_published);
    } else if (filterStatus === 'draft') {
      filtered = filtered.filter(p => !p.is_published);
    } else if (filterStatus === 'featured') {
      filtered = filtered.filter(p => p.is_featured);
    }

    setFilteredProjects(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await portfolioApi.deleteProject(id);
      toast.success('Project deleted successfully');
      loadProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const togglePublish = async (project: PortfolioProject) => {
    try {
      await portfolioApi.updateProject(project.id, {
        is_published: !project.is_published
      });
      toast.success(`Project ${!project.is_published ? 'published' : 'unpublished'}`);
      loadProjects();
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  const toggleFeatured = async (project: PortfolioProject) => {
    try {
      await portfolioApi.updateProject(project.id, {
        is_featured: !project.is_featured
      });
      toast.success(`Project ${!project.is_featured ? 'featured' : 'unfeatured'}`);
      loadProjects();
    } catch (error) {
      toast.error('Failed to update project');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400" />
                <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
              </div>
            </div>
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              Add New Project
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'featured'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-black/40 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No projects found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition"
              >
                <div className="flex items-start gap-4">
                  {/* Project Image */}
                  <img
                    src={project.cover_image_url}
                    alt={project.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Project Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {project.client} • {project.my_role}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {project.is_featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                            Featured
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            project.is_published
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {project.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.short_description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => togglePublish(project)}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition"
                      >
                        {project.is_published ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publish
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => toggleFeatured(project)}
                        className={`flex items-center gap-1 px-3 py-1 text-white text-sm rounded transition ${
                          project.is_featured
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        <Star className="w-4 h-4" />
                        {project.is_featured ? 'Unfeatured' : 'Feature'}
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
