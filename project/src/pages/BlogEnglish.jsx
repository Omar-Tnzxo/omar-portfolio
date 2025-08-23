import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

function BlogEnglish() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample articles data - in a real application, this would come from a database
  const articles = [
    {
      id: 1,
      title: 'How to Calculate Accurate ROI for Real Estate in Egypt',
      excerpt: 'Learn the correct method to calculate Return on Investment for properties and maximize your real estate investments in the Egyptian market',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1073&auto=format&fit=crop',
      category: 'real-estate-investment',
      categoryTitle: 'Real Estate Investment',
      date: 'May 15, 2025',
      readTime: '7 min read',
      slug: 'how-to-calculate-real-estate-roi-en'
    },
    {
      id: 2,
      title: 'Complete Guide to Mortgage Calculation in 2025',
      excerpt: 'Calculate mortgage payments accurately and choose the best financing plan that suits your income and financial obligations',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1111&auto=format&fit=crop',
      category: 'mortgage',
      categoryTitle: 'Mortgage',
      date: 'May 10, 2025',
      readTime: '9 min read',
      slug: 'complete-guide-mortgage-calculation-en'
    },
    {
      id: 3,
      title: 'Comparison of Best Real Estate Calculator Apps in 2025',
      excerpt: 'Discover the pros and cons of real estate calculator applications and how CalcRealty outperforms its competitors',
      image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1101&auto=format&fit=crop',
      category: 'comparisons',
      categoryTitle: 'Comparisons',
      date: 'May 5, 2025',
      readTime: '6 min read',
      slug: 'best-real-estate-calculator-apps-comparison-en'
    },
    {
      id: 4,
      title: '5 Tips for Professional Real Estate Valuation in the Egyptian Market',
      excerpt: 'Learn how to accurately and professionally evaluate properties using specialized real estate calculators',
      image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=1170&auto=format&fit=crop',
      category: 'property-valuation',
      categoryTitle: 'Property Valuation',
      date: 'May 1, 2025',
      readTime: '8 min read',
      slug: 'professional-real-estate-valuation-tips-en'
    },
    {
      id: 5,
      title: 'How to Use CalcRealty App for Construction and Finishing Cost Calculation',
      excerpt: 'Step-by-step guide to using CalcRealty in calculating construction and finishing costs accurately',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1031&auto=format&fit=crop',
      category: 'user-guide',
      categoryTitle: 'User Guide',
      date: 'April 25, 2025',
      readTime: '5 min read',
      slug: 'using-calcrealty-for-construction-cost-en'
    },
    {
      id: 6,
      title: 'Difference Between Traditional and Islamic Mortgage Calculations',
      excerpt: 'Comprehensive comparison between traditional and Islamic real estate financing calculation methods and how to use CalcRealty for both',
      image: 'https://images.unsplash.com/photo-1638913662252-70efce1e60a7?q=80&w=1170&auto=format&fit=crop',
      category: 'mortgage',
      categoryTitle: 'Mortgage',
      date: 'April 20, 2025',
      readTime: '10 min read',
      slug: 'difference-traditional-islamic-mortgage-en'
    }
  ];

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from articles
  const categories = [
    { id: 'all', title: 'All Articles' },
    ...Array.from(new Set(articles.map(article => article.category)))
      .map(category => {
        const articleWithCategory = articles.find(a => a.category === category);
        return {
          id: category,
          title: articleWithCategory?.categoryTitle || category
        };
      })
  ];

  // Calculate pagination
  const articlesPerPage = 4;
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="min-h-screen bg-background py-20 px-4 font-cairo">
      <Helmet>
        <title>CalcRealty Blog | Real Estate Investment Articles and Guides for Egypt</title>
        <meta name="description" content="CalcRealty Blog provides specialized articles and tips on real estate investment, ROI calculation, and mortgage financing in Egypt and the Arab world" />
        <meta property="og:title" content="CalcRealty Blog | Real Estate Articles and Guides for Egypt" />
        <meta property="og:description" content="Specialized articles and tips on real estate investment and calculations in Egypt and the Arab world" />
        <meta property="og:image" content="https://calcrealty.netlify.app/app-logo.png" />
        <meta property="og:url" content="https://calcrealty.netlify.app/blog-en" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CalcRealty Blog | Real Estate Articles and Guides for Egypt" />
        <meta name="twitter:description" content="Specialized articles and tips on real estate investment and calculations in Egypt and the Arab world" />
        <meta name="twitter:image" content="https://calcrealty.netlify.app/app-logo.png" />
        <link rel="canonical" href="https://calcrealty.netlify.app/blog-en" />
      </Helmet>
      <div className="container mx-auto max-w-6xl">
        {/* Header and title */}
        <div className="mb-12">
          <Link to="/" className="flex items-center text-primary mb-6 hover:underline">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4 gradient-text text-center">CalcRealty Blog</h1>
          <p className="text-gray-300 text-lg text-center mb-8 max-w-3xl mx-auto">
            Specialized articles and tips on real estate investment and calculations in Egypt and the Arab world
          </p>
          
          {/* Blog search */}
          <div className="max-w-md mx-auto relative mb-12">
            <input
              type="text"
              placeholder="Search the blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-white"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Article categories */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Articles display */}
        {currentArticles.length > 0 ? (
          <>
            {/* Featured article */}
            <div className="mb-12">
              <Link 
                to={`/blog-en/${currentArticles[0].slug}`} 
                className="group block glass-card overflow-hidden transition-all hover:translate-y-[-4px]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={currentArticles[0].image} 
                    alt={currentArticles[0].title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 bg-primary/90 text-white text-sm rounded-full mb-4">
                      {currentArticles[0].categoryTitle}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {currentArticles[0].title}
                    </h2>
                    <p className="text-gray-300 text-lg line-clamp-2 mb-4">
                      {currentArticles[0].excerpt}
                    </p>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-3">{currentArticles[0].date}</span>
                      <Clock className="w-4 h-4 mr-1 ml-4" />
                      <span>{currentArticles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Grid of articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.slice(1).map((article) => (
                <Link 
                  key={article.id}
                  to={`/blog-en/${article.slug}`}
                  className="glass-card overflow-hidden transition-all hover:translate-y-[-4px] group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                      {article.categoryTitle}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-2 text-sm flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full ${
                      currentPage === 1
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full ${
                      currentPage === totalPages
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-white bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 glass-card">
            <h3 className="text-2xl font-bold mb-4">No matching articles found</h3>
            <p className="text-gray-300 mb-6">
              We couldn't find any articles that match your search criteria
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary bg-primary hover:bg-primary/80"
            >
              View all articles
            </button>
          </div>
        )}

        {/* Newsletter subscription */}
        <div className="mt-20 glass-card p-10 text-center">
          <h3 className="text-2xl font-bold mb-4">Subscribe to CalcRealty Newsletter</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Get the latest articles, real estate tips, and updates about the CalcRealty app directly to your inbox
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:border-primary text-white"
            />
            <button className="btn-primary bg-primary hover:bg-primary/80 rounded-r-lg rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>

        {/* Language switch */}
        <div className="mt-12 text-center">
          <Link to="/blog" className="text-primary hover:underline flex items-center justify-center">
            <ArrowRight className="mr-2 w-5 h-5" />
            قراءة المدونة باللغة العربية
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogEnglish; 