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
    isمنشور: true,
    displayOrder: 0,
    metaTitle: '',
    metaDescription: '',
    المهارات: [] as string[],
    techStack: {
      الواجهة الأمامية: [] as string[],
      الخادم: [] as string[],
      الأدوات: [] as string[],
    },
    gallery: [] as string[],
    results: [] as string[],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newTechالواجهة الأمامية, setNewTechالواجهة الأمامية] = useState('');
  const [newTechالخادم, setNewTechالخادم] = useState('');
  const [newTechالأدوات, setNewTechالأدوات] = useState('');
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
      toast.error('فشل في تحميل التصنيفات');
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

  // المهارات handlers
  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        المهارات: [...prev.المهارات, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const إزالةSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      المهارات: prev.المهارات.filter((_, i) => i !== index),
    }));
  };

  // التقنيات المستخدمة handlers
  const addTech = (category: 'الواجهة الأمامية' | 'الخادم' | 'الأدوات', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: {
          ...prev.techStack,
          [category]: [...prev.techStack[category], value.trim()],
        },
      }));
      
      if (category === 'الواجهة الأمامية') setNewTechالواجهة الأمامية('');
      if (category === 'الخادم') setNewTechالخادم('');
      if (category === 'الأدوات') setNewTechالأدوات('');
    }
  };

  const إزالةTech = (category: 'الواجهة الأمامية' | 'الخادم' | 'الأدوات', index: number) => {
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

  const إزالةGalleryUrl = (index: number) => {
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

  const إزالةResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.categoryId) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        const result = await adminApi.updateProject(id, formData);
        if (result.error) throw result.error;
        toast.success('تم تحديث المشروع بنجاح');
      } else {
        const result = await adminApi.createProject(formData);
        if (result.error) throw result.error;
        toast.success('تم إنشاء المشروع بنجاح');
      }
      navigate('/admin/projects');
    } catch (error) {
      toast.error(isEdit ? 'فشل في تحديث المشروع' : 'فشل في إنشاء المشروع');
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
              {isEdit ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">المعلومات الأساسية</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عنوان المشروع *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  dir="rtl"
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    الرابط المختصر *
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
                  إنشاء من العنوان
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    العميل *
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    دوري في المشروع *
                  </label>
                  <input
                    type="text"
                    name="myRole"
                    value={formData.myRole}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    التصنيف *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    تاريخ المشروع *
                  </label>
                  <input
                    type="text"
                    name="projectDate"
                    value={formData.projectDate}
                    onChange={handleInputChange}
                    placeholder="مثال: يناير 2024"
                    required
                    dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  وصف مختصر *
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={2}
                  required
                  dir="rtl"
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الوصف الكامل *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={4}
                  required dir="rtl"
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    التحدي *
                  </label>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleInputChange}
                    rows={3}
                    required dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    الحل *
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows={3}
                    required dir="rtl"
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* الوسائط */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">الوسائط</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  رابط صورة الغلاف *
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
                  رابط الفيديو (اختياري)
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
                  معرض الصور
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="رابط الصورة"
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
                        onClick={() => إزالةGalleryUrl(index)}
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

          {/* المهارات & التقنيات المستخدمة */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">المهارات & Technologies</h2>
            
            <div className="space-y-4">
              {/* المهارات */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  المهارات
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="إضافة مهارة"
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
                  {formData.المهارات.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg"
                    >
                      <span className="text-sm">{skill}</span>
                      <button
                        type="button"
                        onClick={() => إزالةSkill(index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* الواجهة الأمامية Tech */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الواجهة الأمامية Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechالواجهة الأمامية}
                    onChange={(e) => setNewTechالواجهة الأمامية(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('الواجهة الأمامية', newTechالواجهة الأمامية))}
                    placeholder="Add الواجهة الأمامية tech"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('الواجهة الأمامية', newTechالواجهة الأمامية)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.الواجهة الأمامية.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => إزالةTech('الواجهة الأمامية', index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* الخادم Tech */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الخادم Technologies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechالخادم}
                    onChange={(e) => setNewTechالخادم(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('الخادم', newTechالخادم))}
                    placeholder="Add الخادم tech"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('الخادم', newTechالخادم)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.الخادم.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-green-600/20 text-green-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => إزالةTech('الخادم', index)}
                        className="hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* الأدوات */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  الأدوات & Others
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechالأدوات}
                    onChange={(e) => setNewTechالأدوات(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech('الأدوات', newTechالأدوات))}
                    placeholder="Add tool"
                    className="flex-1 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => addTech('الأدوات', newTechالأدوات)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.الأدوات.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-orange-600/20 text-orange-400 rounded-lg"
                    >
                      <span className="text-sm">{tech}</span>
                      <button
                        type="button"
                        onClick={() => إزالةTech('الأدوات', index)}
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
                  رابط المشروع
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
                  رابط GitHub
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
                  placeholder="إضافة نتيجة"
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
                      onClick={() => إزالةResult(index)}
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
                    name="isمنشور"
                    id="isمنشور"
                    checked={formData.isمنشور}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isمنشور" className="text-sm text-gray-300">
                    منشور
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
                    ترتيب العرض
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
                  عنوان الصفحة (SEO)
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
                  وصف الصفحة (SEO)
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
