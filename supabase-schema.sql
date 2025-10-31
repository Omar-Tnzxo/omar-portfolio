-- =============================================
-- SUPABASE PORTFOLIO LIBRARY DATABASE SCHEMA
-- Complete Dynamic Portfolio System
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Storage for images
-- This will be done via Supabase Dashboard

-- =============================================
-- TABLE 1: PORTFOLIO CATEGORIES
-- Stores main category folders (Web Dev, Mobile, etc.)
-- =============================================
CREATE TABLE portfolio_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) NOT NULL, -- Hex color code
  description TEXT,
  icon_url TEXT, -- Optional icon URL
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index for faster queries
CREATE INDEX idx_categories_slug ON portfolio_categories(slug);
CREATE INDEX idx_categories_active ON portfolio_categories(is_active);
CREATE INDEX idx_categories_order ON portfolio_categories(display_order);

-- =============================================
-- TABLE 2: PROJECT SUB-CATEGORIES
-- Stores filter options within each category
-- =============================================
CREATE TABLE project_sub_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES portfolio_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(category_id, slug)
);

-- Index for faster queries
CREATE INDEX idx_sub_categories_category ON project_sub_categories(category_id);
CREATE INDEX idx_sub_categories_slug ON project_sub_categories(slug);

-- =============================================
-- TABLE 3: PORTFOLIO PROJECTS
-- Main projects table with all details
-- =============================================
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  client VARCHAR(200) NOT NULL,
  my_role VARCHAR(200) NOT NULL,
  category_id UUID REFERENCES portfolio_categories(id) ON DELETE CASCADE,
  sub_category_id UUID REFERENCES project_sub_categories(id) ON DELETE SET NULL,
  
  -- Descriptions
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  
  -- Media
  cover_image_url TEXT NOT NULL,
  video_url TEXT,
  
  -- Project details
  project_date VARCHAR(50) NOT NULL,
  project_link TEXT,
  github_link TEXT,
  live_link TEXT,
  
  -- Status & Order
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  
  -- SEO
  meta_title VARCHAR(200),
  meta_description TEXT,
  meta_keywords TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_projects_category ON portfolio_projects(category_id);
CREATE INDEX idx_projects_sub_category ON portfolio_projects(sub_category_id);
CREATE INDEX idx_projects_slug ON portfolio_projects(slug);
CREATE INDEX idx_projects_featured ON portfolio_projects(is_featured);
CREATE INDEX idx_projects_published ON portfolio_projects(is_published);
CREATE INDEX idx_projects_order ON portfolio_projects(display_order);

-- =============================================
-- TABLE 4: PROJECT SKILLS
-- Skills/technologies used in each project
-- =============================================
CREATE TABLE project_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  skill_name VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_skills_project ON project_skills(project_id);

-- =============================================
-- TABLE 5: PROJECT TECH STACK
-- Detailed tech stack breakdown
-- =============================================
CREATE TABLE project_tech_stack (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- 'frontend', 'backend', 'tools'
  tech_name VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_tech_stack_project ON project_tech_stack(project_id);
CREATE INDEX idx_tech_stack_category ON project_tech_stack(category);

-- =============================================
-- TABLE 6: PROJECT GALLERY
-- Image gallery for each project
-- =============================================
CREATE TABLE project_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_gallery_project ON project_gallery(project_id);
CREATE INDEX idx_gallery_order ON project_gallery(display_order);

-- =============================================
-- TABLE 7: PROJECT RESULTS
-- Achievements and metrics for each project
-- =============================================
CREATE TABLE project_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  result_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_results_project ON project_results(project_id);

-- =============================================
-- TABLE 8: CASE SPECIFIC CONTENT
-- Special content for different project types
-- =============================================
CREATE TABLE project_case_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  content_type VARCHAR(50) NOT NULL, -- 'script', 'social-media', 'design', 'code'
  content_data TEXT NOT NULL, -- Can be JSON or plain text
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_case_content_project ON project_case_content(project_id);

-- =============================================
-- TABLE 9: SEO METADATA (Optional - for advanced SEO)
-- =============================================
CREATE TABLE seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL, -- 'project', 'category'
  entity_id UUID NOT NULL,
  og_title VARCHAR(200),
  og_description TEXT,
  og_image_url TEXT,
  twitter_card VARCHAR(50),
  canonical_url TEXT,
  robots VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_seo_entity ON seo_metadata(entity_type, entity_id);

-- =============================================
-- TABLE 10: ANALYTICS (Optional)
-- Track project views
-- =============================================
CREATE TABLE project_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Index
CREATE INDEX idx_analytics_project ON project_analytics(project_id);

-- =============================================
-- FUNCTIONS: AUTO UPDATE TIMESTAMPS
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON portfolio_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sub_categories_updated_at BEFORE UPDATE ON project_sub_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_content_updated_at BEFORE UPDATE ON project_case_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_updated_at BEFORE UPDATE ON seo_metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable for public read, admin write
-- =============================================

-- Enable RLS on all tables
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_case_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read categories" ON portfolio_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read sub_categories" ON project_sub_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read projects" ON portfolio_projects
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read skills" ON project_skills
  FOR SELECT USING (true);

CREATE POLICY "Public read tech_stack" ON project_tech_stack
  FOR SELECT USING (true);

CREATE POLICY "Public read gallery" ON project_gallery
  FOR SELECT USING (true);

CREATE POLICY "Public read results" ON project_results
  FOR SELECT USING (true);

CREATE POLICY "Public read case_content" ON project_case_content
  FOR SELECT USING (true);

CREATE POLICY "Public read seo" ON seo_metadata
  FOR SELECT USING (true);

CREATE POLICY "Public read analytics" ON project_analytics
  FOR SELECT USING (true);

-- Admin write access (authenticated users only)
-- Note: You'll need to configure auth policies in Supabase dashboard

-- =============================================
-- VIEWS: Optimized queries for common operations
-- =============================================

-- View: Complete project with all relations
CREATE OR REPLACE VIEW vw_complete_projects AS
SELECT 
  p.*,
  pc.name as category_name,
  pc.slug as category_slug,
  pc.color as category_color,
  psc.name as sub_category_name,
  psc.slug as sub_category_slug,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('skill', ps.skill_name, 'order', ps.display_order)) 
    FILTER (WHERE ps.id IS NOT NULL),
    '[]'
  ) as skills,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('category', pts.category, 'tech', pts.tech_name, 'order', pts.display_order)) 
    FILTER (WHERE pts.id IS NOT NULL),
    '[]'
  ) as tech_stack,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('url', pg.image_url, 'caption', pg.caption, 'order', pg.display_order)) 
    FILTER (WHERE pg.id IS NOT NULL),
    '[]'
  ) as gallery,
  COALESCE(
    json_agg(DISTINCT jsonb_build_object('result', pr.result_text, 'order', pr.display_order)) 
    FILTER (WHERE pr.id IS NOT NULL),
    '[]'
  ) as results
FROM portfolio_projects p
LEFT JOIN portfolio_categories pc ON p.category_id = pc.id
LEFT JOIN project_sub_categories psc ON p.sub_category_id = psc.id
LEFT JOIN project_skills ps ON p.id = ps.project_id
LEFT JOIN project_tech_stack pts ON p.id = pts.project_id
LEFT JOIN project_gallery pg ON p.id = pg.project_id
LEFT JOIN project_results pr ON p.id = pr.project_id
WHERE p.is_published = true
GROUP BY p.id, pc.id, psc.id
ORDER BY p.display_order, p.created_at DESC;

-- View: Featured projects for homepage
CREATE OR REPLACE VIEW vw_featured_projects AS
SELECT * FROM vw_complete_projects
WHERE is_featured = true
ORDER BY display_order
LIMIT 3;

-- View: Category summary with project count
CREATE OR REPLACE VIEW vw_category_summary AS
SELECT 
  pc.*,
  COUNT(p.id) as project_count
FROM portfolio_categories pc
LEFT JOIN portfolio_projects p ON pc.id = p.category_id AND p.is_published = true
WHERE pc.is_active = true
GROUP BY pc.id
ORDER BY pc.display_order;

-- =============================================
-- COMMENTS: Database Documentation
-- =============================================
COMMENT ON TABLE portfolio_categories IS 'Main portfolio category folders (Web Dev, Mobile Apps, etc.)';
COMMENT ON TABLE project_sub_categories IS 'Filter options within each category';
COMMENT ON TABLE portfolio_projects IS 'Main projects table with all case study details';
COMMENT ON TABLE project_skills IS 'Skills and technologies used in projects';
COMMENT ON TABLE project_tech_stack IS 'Detailed tech stack breakdown by category';
COMMENT ON TABLE project_gallery IS 'Image gallery for each project';
COMMENT ON TABLE project_results IS 'Project achievements and metrics';
COMMENT ON TABLE project_case_content IS 'Special content for different project types';
COMMENT ON TABLE seo_metadata IS 'SEO metadata for projects and categories';
COMMENT ON TABLE project_analytics IS 'Project view tracking and analytics';

-- =============================================
-- END OF SCHEMA
-- =============================================
