import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, X } from 'lucide-react';
import { adminApi } from '../../services/admin-api';
import { portfolioApi } from '../../services/portfolio-api';
import { toast } from 'sonner';

const AdminProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    client: '',
    myRole: '',
    categoryId: '',
    subCategoryId: '',
    shortDescription: '',
    fullDescription: '',
    challenge: '',
    solution: '',
    coverImageUrl: '',
    videoUrl: '',
    projectDate: '',
    projectLink: '',
    githubLink: '',
    liveLink: '',
    isFeatured: false,
    isPublished: true,
    displayOrder: 0,
    metaTitle: '',
    metaDescription: '',
    skills: [] as string[],
    techStack: {
      frontend: [] as string[],
      backend: [] as string[],
      tools: [] as string[],
    },
    gallery: [] as string[],
    results: [] as string[],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newTechFrontend, setNewTechFrontend] = useState('');
  const [newTechBackend, setNewTechBackend] = useState('');
  const [newTechTools, setNewTechTools] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newResult, setNewResult] = useState('');

  useEffect(() => {
    loadCategories();
    if (isEdit && id) {
      // loadProject(id);
    }
  }, [isEdit, id]);

  const loadCategories = async () => {
    try {
      const data = await portfolioApi.getCategories();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSlugGenerate = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  // Skills handlers
  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Tech Stack handlers
  const addTech = (category: 'frontend' | 'backend' | 'tools', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: {
          ...prev.techStack,
          [category]: [...prev.techStack[category], value.trim()],
        },
      }));
      
      if (category === 'frontend') setNewTechFrontend('');
      if (category === 'backend') setNewTechBackend('');
      if (category === 'tools') setNewTechTools('');
    }
  };

  const removeTech = (category: 'frontend' | 'backend' | 'tools', index: number) => {
    setFormData(prev => ({
      ...prev,
      techStack: {
        ...prev.techStack,
        [category]: prev.techStack[category].filter((_, i) => i !== index),
      },
    }));
  };

  // Gallery handlers
  const addGalleryUrl = () => {
    if (newGalleryUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryUrl.trim()],
      }));
      setNewGalleryUrl('');
    }
  };

  const removeGalleryUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Results handlers
  const addResult = () => {
    if (newResult.trim()) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, newResult.trim()],
      }));
      setNewResult('');
    }
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        const result = await adminApi.updateProject(id, formData);
        if (result.error) throw result.error;
        toast.success('Project updated successfully');
      } else {
        const result = await adminApi.createProject(formData);
        if (result.error) throw result.error;
        toast.success('Project created successfully');
      }
      navigate('/admin/projects');
    } catch (error) {
      toast.error(isEdit ? 'Failed to update project' : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/projects"
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-2xl font-bold text-white">
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSlugGenerate}
                  className="mt-7 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Generate from Title
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client *
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    My Role *
                  </label>
                  <input
                    type="text"
                    name="myRole"
                    value={formData.myRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Date *
                  </label>
                  <input
                    type="text"
                    name="projectDate"
                    value={formData.projectDate}
                    onChange={handleInputChange}
                    placeholder="e.g., January 2024"
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={2}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Challenge *
                  </label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Solution *
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video URL (optional)
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gallery Images
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addGalleryUrl}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.gallery.map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg"
                    >
                      <span className="text-sm truncate max-w-[200px]">{url}</span>
                      <button
                        type="button"
                        onClick={() => removeGalleryUrl(index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Tech Stack */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Skills & Technologies</h2>
            
            <div className="space-y-4">
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="Add skill"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg"
                    >
                      <span className="text-sm">{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frontend Tech */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Frontend Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechFrontend}
                    onChange={(e) => setNewTechFrontend(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('frontend', newTechFrontend))}
                    placeholder="Add frontend tech"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('frontend', newTechFrontend)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.frontend.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech('frontend', index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Tech */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Backend Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechBackend}
                    onChange={(e) => setNewTechBackend(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('backend', newTechBackend))}
                    placeholder="Add backend tech"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('backend', newTechBackend)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.backend.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech('backend', index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tools & Others
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechTools}
                    onChange={(e) => setNewTechTools(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('tools', newTechTools))}
                    placeholder="Add tool"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('tools', newTechTools)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.tools.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-orange-600/20 text-orange-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech('tools', index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Links</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Link
                </label>
                <input
                  type="url"
                  name="projectLink"
                  value={formData.projectLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Live Link
                </label>
                <input
                  type="url"
                  name="liveLink"
                  value={formData.liveLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Results & Achievements</h2>
            
            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newResult}
                  onChange={(e) => setNewResult(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResult())}
                  placeholder="Add result"
                  className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addResult}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg"
                  >
                    <span className="flex-1 text-sm">{result}</span>
                    <button
                      type="button"
                      onClick={() => removeResult(index)}
                      className="hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings & SEO */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Settings & SEO</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPublished"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isPublished" className="text-sm text-gray-300">
                    Published
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isFeatured" className="text-sm text-gray-300">
                    Featured
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Description (SEO)
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
            </button>
            <Link
              to="/admin/projects"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
