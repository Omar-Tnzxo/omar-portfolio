// Portfolio API Services - Supabase Integration
import { supabase, SUPABASE_ENABLED } from '../lib/supabase';
import type { PortfolioCategory, PortfolioProject } from '../types/portfolio';

// Fallback to static data if Supabase is not configured
import {
  PORTFOLIO_CATEGORIES as STATIC_CATEGORIES,
  PORTFOLIO_PROJECTS as STATIC_PROJECTS,
  PROJECT_SUB_CATEGORIES as STATIC_SUB_CATEGORIES,
} from '../constants/portfolio';

// =============================================
// CATEGORIES API
// =============================================

export interface CategoryWithCount extends PortfolioCategory {
  project_count?: number;
}

/**
 * Fetch all active portfolio categories
 */
export const fetchCategories = async (): Promise<CategoryWithCount[]> => {
  if (!SUPABASE_ENABLED) {
    // Fallback to static data
    return STATIC_CATEGORIES.map(cat => ({
      ...cat,
      project_count: STATIC_PROJECTS.filter(p => p.category === cat.slug).length,
    }));
  }

  try {
    const { data, error } = await supabase
      .from('vw_category_summary')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return data.map(cat => ({
      id: cat.slug,
      name: cat.name,
      slug: cat.slug,
      color: cat.color,
      description: cat.description || '',
      project_count: cat.project_count || 0,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to static data on error
    return STATIC_CATEGORIES.map(cat => ({
      ...cat,
      project_count: STATIC_PROJECTS.filter(p => p.category === cat.slug).length,
    }));
  }
};

/**
 * Fetch single category by slug
 */
export const fetchCategoryBySlug = async (
  slug: string
): Promise<PortfolioCategory | null> => {
  if (!SUPABASE_ENABLED) {
    return STATIC_CATEGORIES.find(cat => cat.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    return {
      id: data.slug,
      name: data.name,
      slug: data.slug,
      color: data.color,
      description: data.description || '',
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return STATIC_CATEGORIES.find(cat => cat.slug === slug) || null;
  }
};

// =============================================
// SUB-CATEGORIES API
// =============================================

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Fetch sub-categories for a specific category
 */
export const fetchSubCategories = async (
  categorySlug: string
): Promise<SubCategory[]> => {
  if (!SUPABASE_ENABLED) {
    return STATIC_SUB_CATEGORIES[categorySlug] || [{ id: 'all', name: 'All', slug: 'all' }];
  }

  try {
    // First get category ID
    const { data: category } = await supabase
      .from('portfolio_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (!category) return [{ id: 'all', name: 'All', slug: 'all' }];

    const { data, error } = await supabase
      .from('project_sub_categories')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) throw error;

    return data.map(sub => ({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
    }));
  } catch (error) {
    console.error('Error fetching sub-categories:', error);
    return STATIC_SUB_CATEGORIES[categorySlug] || [{ id: 'all', name: 'All', slug: 'all' }];
  }
};

// =============================================
// PROJECTS API
// =============================================

/**
 * Fetch featured projects for homepage (limit 3)
 */
export const fetchFeaturedProjects = async (): Promise<PortfolioProject[]> => {
  if (!SUPABASE_ENABLED) {
    return STATIC_PROJECTS.filter(p => 
      ['calcrealty-app', 'real-estate-lead-engine', 'portfolio-website'].includes(p.id)
    ).slice(0, 3);
  }

  try {
    const { data, error } = await supabase
      .from('vw_complete_projects')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(3);

    if (error) throw error;

    return transformSupabaseProjects(data);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return STATIC_PROJECTS.slice(0, 3);
  }
};

/**
 * Fetch projects by category
 */
export const fetchProjectsByCategory = async (
  categorySlug: string,
  subCategorySlug?: string
): Promise<PortfolioProject[]> => {
  if (!SUPABASE_ENABLED) {
    let projects = STATIC_PROJECTS.filter(p => p.category === categorySlug);
    
    if (subCategorySlug && subCategorySlug !== 'all') {
      projects = projects.filter(p => p.subCategory === subCategorySlug);
    }
    
    return projects;
  }

  try {
    let query = supabase
      .from('vw_complete_projects')
      .select('*')
      .eq('category_slug', categorySlug);

    if (subCategorySlug && subCategorySlug !== 'all') {
      query = query.eq('sub_category_slug', subCategorySlug);
    }

    const { data, error } = await query.order('display_order', { ascending: true });

    if (error) throw error;

    return transformSupabaseProjects(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return STATIC_PROJECTS.filter(p => p.category === categorySlug);
  }
};

/**
 * Fetch single project by slug
 */
export const fetchProjectBySlug = async (
  categorySlug: string,
  projectSlug: string
): Promise<PortfolioProject | null> => {
  if (!SUPABASE_ENABLED) {
    return (
      STATIC_PROJECTS.find(
        p => p.category === categorySlug && p.slug === projectSlug
      ) || null
    );
  }

  try {
    const { data, error } = await supabase
      .from('vw_complete_projects')
      .select('*')
      .eq('category_slug', categorySlug)
      .eq('slug', projectSlug)
      .single();

    if (error) throw error;

    // Fetch case-specific content
    const { data: caseContent } = await supabase
      .from('project_case_content')
      .select('*')
      .eq('project_id', data.id)
      .single();

    const projects = transformSupabaseProjects([data]);
    const project = projects[0];

    if (caseContent) {
      project.caseSpecificContent = {
        type: caseContent.content_type as any,
        content: caseContent.content_data,
      };
    }

    // Increment view count
    incrementProjectView(data.id);

    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return (
      STATIC_PROJECTS.find(
        p => p.category === categorySlug && p.slug === projectSlug
      ) || null
    );
  }
};

// =============================================
// HELPER FUNCTIONS
// =============================================

/**
 * Transform Supabase data to PortfolioProject format
 */
const transformSupabaseProjects = (data: any[]): PortfolioProject[] => {
  return data.map(item => {
    // Parse skills from JSON
    const skills = Array.isArray(item.skills)
      ? item.skills
          .filter((s: any) => s && s.skill)
          .sort((a: any, b: any) => a.order - b.order)
          .map((s: any) => s.skill)
      : [];

    // Parse tech stack from JSON
    const techStack: any = { frontend: [], backend: [], tools: [] };
    if (Array.isArray(item.tech_stack)) {
      item.tech_stack
        .filter((t: any) => t && t.tech && t.category)
        .sort((a: any, b: any) => a.order - b.order)
        .forEach((t: any) => {
          if (techStack[t.category]) {
            techStack[t.category].push(t.tech);
          }
        });
    }

    // Parse gallery from JSON
    const gallery = Array.isArray(item.gallery)
      ? item.gallery
          .filter((g: any) => g && g.url)
          .sort((a: any, b: any) => a.order - b.order)
          .map((g: any) => g.url)
      : [];

    // Parse results from JSON
    const results = Array.isArray(item.results)
      ? item.results
          .filter((r: any) => r && r.result)
          .sort((a: any, b: any) => a.order - b.order)
          .map((r: any) => r.result)
      : [];

    return {
      id: item.id,
      slug: item.slug,
      title: item.title,
      client: item.client,
      myRole: item.my_role,
      category: item.category_slug,
      subCategory: item.sub_category_slug,
      shortDescription: item.short_description,
      fullDescription: item.full_description,
      challenge: item.challenge,
      solution: item.solution,
      image: item.cover_image_url,
      video: item.video_url,
      skills,
      techStack: {
        frontend: techStack.frontend,
        backend: techStack.backend,
        tools: techStack.tools,
      },
      projectDate: item.project_date,
      projectLink: item.project_link,
      githubLink: item.github_link,
      liveLink: item.live_link,
      gallery,
      results,
    };
  });
};

/**
 * Increment project view count (fire and forget)
 */
const incrementProjectView = async (projectId: string): Promise<void> => {
  if (!SUPABASE_ENABLED) return;

  try {
    // Check if analytics record exists
    const { data: existing } = await supabase
      .from('project_analytics')
      .select('view_count')
      .eq('project_id', projectId)
      .single();

    if (existing) {
      // Update existing record
      await supabase
        .from('project_analytics')
        .update({
          view_count: (existing.view_count || 0) + 1,
          last_viewed_at: new Date().toISOString(),
        })
        .eq('project_id', projectId);
    } else {
      // Insert new record
      await supabase.from('project_analytics').insert({
        project_id: projectId,
        view_count: 1,
        last_viewed_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Silently fail - analytics shouldn't break the app
    console.warn('Analytics error:', error);
  }
};

// =============================================
// SEARCH & FILTERS
// =============================================

/**
 * Search projects by keyword
 */
export const searchProjects = async (keyword: string): Promise<PortfolioProject[]> => {
  if (!SUPABASE_ENABLED) {
    const lowerKeyword = keyword.toLowerCase();
    return STATIC_PROJECTS.filter(
      p =>
        p.title.toLowerCase().includes(lowerKeyword) ||
        p.shortDescription.toLowerCase().includes(lowerKeyword) ||
        p.skills.some(s => s.toLowerCase().includes(lowerKeyword))
    );
  }

  try {
    const { data, error } = await supabase
      .from('vw_complete_projects')
      .select('*')
      .or(
        `title.ilike.%${keyword}%,short_description.ilike.%${keyword}%,client.ilike.%${keyword}%`
      )
      .order('display_order', { ascending: true });

    if (error) throw error;

    return transformSupabaseProjects(data);
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
};

// =============================================
// EXPORTS
// =============================================

// =============================================
// ADMIN FUNCTIONS
// =============================================

/**
 * Get all projects (including unpublished) - Admin only
 */
export const getAllProjects = async (): Promise<any[]> => {
  if (!SUPABASE_ENABLED) {
    return STATIC_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select(`
        *,
        portfolio_categories (name, slug, color),
        project_sub_categories (name, slug)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      client: item.client,
      my_role: item.my_role,
      category: item.portfolio_categories?.slug,
      category_name: item.portfolio_categories?.name,
      sub_category: item.project_sub_categories?.slug,
      short_description: item.short_description,
      full_description: item.full_description,
      challenge: item.challenge,
      solution: item.solution,
      cover_image_url: item.cover_image_url,
      video_url: item.video_url,
      project_date: item.project_date,
      project_link: item.project_link,
      github_link: item.github_link,
      live_link: item.live_link,
      is_featured: item.is_featured,
      is_published: item.is_published,
      display_order: item.display_order,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
};

/**
 * Get all categories (including inactive) - Admin only
 */
export const getCategories = async (): Promise<any[]> => {
  if (!SUPABASE_ENABLED) {
    return STATIC_CATEGORIES;
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

/**
 * Update project - Admin only
 */
export const updateProject = async (id: string, updates: any): Promise<{ data: any; error: Error | null }> => {
  if (!SUPABASE_ENABLED) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update(updates)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete project - Admin only
 */
export const deleteProject = async (id: string): Promise<{ success: boolean; error: Error | null }> => {
  if (!SUPABASE_ENABLED) {
    return { success: false, error: new Error('Supabase not configured') };
  }

  try {
    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

export const portfolioApi = {
  // Categories
  fetchCategories,
  fetchCategoryBySlug,
  getCategories,
  
  // Sub-categories
  fetchSubCategories,
  
  // Projects
  fetchFeaturedProjects,
  fetchProjectsByCategory,
  fetchProjectBySlug,
  getAllProjects,
  updateProject,
  deleteProject,
  
  // Search
  searchProjects,
};

export default portfolioApi;
