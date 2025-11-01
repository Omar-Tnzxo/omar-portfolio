// Admin API Service - CRUD Operations for Portfolio
import { supabase } from '../lib/supabase';
import type { PortfolioCategory, PortfolioProject } from '../types/portfolio';

// =============================================
// CATEGORIES ADMIN API
// =============================================

/**
 * Create new category
 */
export const createCategory = async (category: Omit<PortfolioCategory, 'id'>) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .insert([
        {
          name: category.name,
          slug: category.slug,
          color: category.color,
          description: category.description,
          display_order: 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update category
 */
export const updateCategory = async (id: string, updates: Partial<PortfolioCategory>) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (id: string) => {
  try {
    const { error } = await supabase.from('portfolio_categories').delete().eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// =============================================
// PROJECTS ADMIN API
// =============================================

/**
 * Create new project
 */
export const createProject = async (project: any) => {
  try {
    // Insert main project
    const { data: projectData, error: projectError } = await supabase
      .from('portfolio_projects')
      .insert([
        {
          slug: project.slug,
          title: project.title,
          client: project.client,
          my_role: project.myRole,
          category_id: project.categoryId,
          sub_category_id: project.subCategoryId,
          short_description: project.shortDescription,
          full_description: project.fullDescription,
          challenge: project.challenge,
          solution: project.solution,
          cover_image_url: project.coverImageUrl,
          video_url: project.videoUrl,
          project_date: project.projectDate,
          project_link: project.projectLink,
          github_link: project.githubLink,
          live_link: project.liveLink,
          is_featured: project.isFeatured || false,
          is_published: project.isPublished || true,
          display_order: project.displayOrder || 0,
          meta_title: project.metaTitle,
          meta_description: project.metaDescription,
        },
      ])
      .select()
      .single();

    if (projectError) throw projectError;

    const projectId = projectData.id;

    // Insert skills
    if (project.skills && project.skills.length > 0) {
      const skillsData = project.skills.map((skill: string, index: number) => ({
        project_id: projectId,
        skill_name: skill,
        display_order: index,
      }));

      await supabase.from('project_skills').insert(skillsData);
    }

    // Insert tech stack
    if (project.techStack) {
      const techStackData: any[] = [];
      
      if (project.techStack.frontend) {
        project.techStack.frontend.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: projectId,
            category: 'frontend',
            tech_name: tech,
            display_order: index,
          });
        });
      }
      
      if (project.techStack.backend) {
        project.techStack.backend.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: projectId,
            category: 'backend',
            tech_name: tech,
            display_order: index,
          });
        });
      }
      
      if (project.techStack.tools) {
        project.techStack.tools.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: projectId,
            category: 'tools',
            tech_name: tech,
            display_order: index,
          });
        });
      }

      if (techStackData.length > 0) {
        await supabase.from('project_tech_stack').insert(techStackData);
      }
    }

    // Insert gallery
    if (project.gallery && project.gallery.length > 0) {
      const galleryData = project.gallery.map((url: string, index: number) => ({
        project_id: projectId,
        image_url: url,
        display_order: index,
      }));

      await supabase.from('project_gallery').insert(galleryData);
    }

    // Insert results
    if (project.results && project.results.length > 0) {
      const resultsData = project.results.map((result: string, index: number) => ({
        project_id: projectId,
        result_text: result,
        display_order: index,
      }));

      await supabase.from('project_results').insert(resultsData);
    }

    return { data: projectData, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Update project
 */
export const updateProject = async (id: string, updates: any) => {
  try {
    // Update main project
    const { data: projectData, error: projectError } = await supabase
      .from('portfolio_projects')
      .update({
        title: updates.title,
        client: updates.client,
        my_role: updates.myRole,
        category_id: updates.categoryId,
        sub_category_id: updates.subCategoryId,
        short_description: updates.shortDescription,
        full_description: updates.fullDescription,
        challenge: updates.challenge,
        solution: updates.solution,
        cover_image_url: updates.coverImageUrl,
        video_url: updates.videoUrl,
        project_date: updates.projectDate,
        project_link: updates.projectLink,
        github_link: updates.githubLink,
        live_link: updates.liveLink,
        is_featured: updates.isFeatured,
        is_published: updates.isPublished,
        display_order: updates.displayOrder,
        meta_title: updates.metaTitle,
        meta_description: updates.metaDescription,
      })
      .eq('id', id)
      .select()
      .single();

    if (projectError) throw projectError;

    // Update skills (delete old, insert new)
    if (updates.skills) {
      await supabase.from('project_skills').delete().eq('project_id', id);

      if (updates.skills.length > 0) {
        const skillsData = updates.skills.map((skill: string, index: number) => ({
          project_id: id,
          skill_name: skill,
          display_order: index,
        }));

        await supabase.from('project_skills').insert(skillsData);
      }
    }

    // Update tech stack
    if (updates.techStack) {
      await supabase.from('project_tech_stack').delete().eq('project_id', id);

      const techStackData: any[] = [];
      
      if (updates.techStack.frontend) {
        updates.techStack.frontend.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: id,
            category: 'frontend',
            tech_name: tech,
            display_order: index,
          });
        });
      }
      
      if (updates.techStack.backend) {
        updates.techStack.backend.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: id,
            category: 'backend',
            tech_name: tech,
            display_order: index,
          });
        });
      }
      
      if (updates.techStack.tools) {
        updates.techStack.tools.forEach((tech: string, index: number) => {
          techStackData.push({
            project_id: id,
            category: 'tools',
            tech_name: tech,
            display_order: index,
          });
        });
      }

      if (techStackData.length > 0) {
        await supabase.from('project_tech_stack').insert(techStackData);
      }
    }

    // Update gallery
    if (updates.gallery) {
      await supabase.from('project_gallery').delete().eq('project_id', id);

      if (updates.gallery.length > 0) {
        const galleryData = updates.gallery.map((url: string, index: number) => ({
          project_id: id,
          image_url: url,
          display_order: index,
        }));

        await supabase.from('project_gallery').insert(galleryData);
      }
    }

    // Update results
    if (updates.results) {
      await supabase.from('project_results').delete().eq('project_id', id);

      if (updates.results.length > 0) {
        const resultsData = updates.results.map((result: string, index: number) => ({
          project_id: id,
          result_text: result,
          display_order: index,
        }));

        await supabase.from('project_results').insert(resultsData);
      }
    }

    return { data: projectData, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get project by ID with all relations
 */
export const getProjectById = async (id: string) => {
  try {
    // Get main project data
    const { data: project, error: projectError } = await supabase
      .from('portfolio_projects')
      .select(`
        *,
        portfolio_categories (
          id,
          name,
          slug,
          color
        )
      `)
      .eq('id', id)
      .single();

    if (projectError) throw projectError;
    if (!project) return { data: null, error: new Error('Project not found') };

    // Get skills
    const { data: skills } = await supabase
      .from('project_skills')
      .select('skill_name')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    // Get tech stack
    const { data: techStack } = await supabase
      .from('project_tech_stack')
      .select('category, tech_name')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    // Get gallery
    const { data: gallery } = await supabase
      .from('project_gallery')
      .select('image_url')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    // Get results
    const { data: results } = await supabase
      .from('project_results')
      .select('result_text')
      .eq('project_id', id)
      .order('display_order', { ascending: true });

    // Format tech stack
    const techStackFormatted = {
      frontend: techStack?.filter(t => t.category === 'frontend').map(t => t.tech_name) || [],
      backend: techStack?.filter(t => t.category === 'backend').map(t => t.tech_name) || [],
      tools: techStack?.filter(t => t.category === 'tools').map(t => t.tech_name) || [],
    };

    // Combine all data
    const fullProject = {
      ...project,
      skills: skills?.map(s => s.skill_name) || [],
      techStack: techStackFormatted,
      gallery: gallery?.map(g => g.image_url) || [],
      results: results?.map(r => r.result_text) || [],
    };

    return { data: fullProject, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete project
 */
export const deleteProject = async (id: string) => {
  try {
    // Delete project (cascade will delete related records)
    const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

/**
 * Toggle project featured status
 */
export const toggleProjectFeatured = async (id: string, isFeatured: boolean) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update({ is_featured: isFeatured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Toggle project published status
 */
export const toggleProjectPublished = async (id: string, isPublished: boolean) => {
  try {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .update({ is_published: isPublished })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// =============================================
// SUB-CATEGORIES ADMIN API
// =============================================

/**
 * Create sub-category
 */
export const createSubCategory = async (categoryId: string, subCategory: any) => {
  try {
    const { data, error } = await supabase
      .from('project_sub_categories')
      .insert([
        {
          category_id: categoryId,
          name: subCategory.name,
          slug: subCategory.slug,
          display_order: subCategory.displayOrder || 0,
          is_active: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Delete sub-category
 */
export const deleteSubCategory = async (id: string) => {
  try {
    const { error } = await supabase.from('project_sub_categories').delete().eq('id', id);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// =============================================
// ANALYTICS API
// =============================================

/**
 * Get project analytics
 */
export const getProjectAnalytics = async (projectId: string) => {
  try {
    const { data, error } = await supabase
      .from('project_analytics')
      .select('*')
      .eq('project_id', projectId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

/**
 * Get all projects analytics
 */
export const getAllAnalytics = async () => {
  try {
    const { data, error } = await supabase
      .from('project_analytics')
      .select('*, portfolio_projects(title, slug)')
      .order('view_count', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// =============================================
// BULK OPERATIONS
// =============================================

/**
 * Bulk update project order
 */
export const bulkUpdateProjectOrder = async (updates: { id: string; order: number }[]) => {
  try {
    const promises = updates.map(({ id, order }) =>
      supabase.from('portfolio_projects').update({ display_order: order }).eq('id', id)
    );

    await Promise.all(promises);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

/**
 * Bulk publish/unpublish projects
 */
export const bulkTogglePublished = async (ids: string[], isPublished: boolean) => {
  try {
    const { error } = await supabase
      .from('portfolio_projects')
      .update({ is_published: isPublished })
      .in('id', ids);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// =============================================
// EXPORTS
// =============================================

export const adminApi = {
  // Categories
  createCategory,
  updateCategory,
  deleteCategory,

  // Projects
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  toggleProjectPublished,

  // Sub-categories
  createSubCategory,
  deleteSubCategory,

  // Analytics
  getProjectAnalytics,
  getAllAnalytics,

  // Bulk
  bulkUpdateProjectOrder,
  bulkTogglePublished,
};

export default adminApi;
