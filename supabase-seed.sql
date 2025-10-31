-- =============================================
-- SUPABASE PORTFOLIO SEED DATA
-- Initial data for testing and demo
-- =============================================

-- =============================================
-- 1. INSERT CATEGORIES
-- =============================================
INSERT INTO portfolio_categories (name, slug, color, description, display_order) VALUES
('Web Development', 'web-development', '#915EFF', 'Full-stack web applications and responsive websites', 1),
('Mobile Apps', 'mobile-apps', '#00D4FF', 'Native and cross-platform mobile applications', 2),
('Social Media Management', 'social-media', '#FF6B9D', 'Content strategy, campaigns, and community management', 3),
('Telegram Bots', 'telegram-bots', '#0088CC', 'Automated bots and integrations for Telegram', 4),
('Automation', 'automation', '#FFA500', 'Workflow automation and process optimization', 5),
('AI Solutions', 'ai-solutions', '#00FF88', 'AI-powered tools and intelligent systems', 6),
('Script Writing', 'script-writing', '#FFD700', 'Video scripts, content narratives, and storytelling', 7),
('AI Design', 'ai-design', '#FF1493', 'AI-assisted design and creative automation', 8);

-- =============================================
-- 2. INSERT SUB-CATEGORIES
-- =============================================

-- Mobile Apps sub-categories
INSERT INTO project_sub_categories (category_id, name, slug, display_order)
SELECT id, 'All', 'all', 0 FROM portfolio_categories WHERE slug = 'mobile-apps'
UNION ALL
SELECT id, 'Real Estate', 'real-estate', 1 FROM portfolio_categories WHERE slug = 'mobile-apps'
UNION ALL
SELECT id, 'Food & Beverage', 'food-beverage', 2 FROM portfolio_categories WHERE slug = 'mobile-apps'
UNION ALL
SELECT id, 'Utilities', 'utilities', 3 FROM portfolio_categories WHERE slug = 'mobile-apps'
UNION ALL
SELECT id, 'Personal Projects', 'personal', 4 FROM portfolio_categories WHERE slug = 'mobile-apps';

-- Web Development sub-categories
INSERT INTO project_sub_categories (category_id, name, slug, display_order)
SELECT id, 'All', 'all', 0 FROM portfolio_categories WHERE slug = 'web-development'
UNION ALL
SELECT id, 'E-commerce', 'ecommerce', 1 FROM portfolio_categories WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Portfolio', 'portfolio', 2 FROM portfolio_categories WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Landing Pages', 'landing', 3 FROM portfolio_categories WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Dashboards', 'dashboard', 4 FROM portfolio_categories WHERE slug = 'web-development';

-- Social Media sub-categories
INSERT INTO project_sub_categories (category_id, name, slug, display_order)
SELECT id, 'All', 'all', 0 FROM portfolio_categories WHERE slug = 'social-media'
UNION ALL
SELECT id, 'Real Estate', 'real-estate', 1 FROM portfolio_categories WHERE slug = 'social-media'
UNION ALL
SELECT id, 'Fashion', 'fashion', 2 FROM portfolio_categories WHERE slug = 'social-media'
UNION ALL
SELECT id, 'Food & Beverage', 'food', 3 FROM portfolio_categories WHERE slug = 'social-media'
UNION ALL
SELECT id, 'Finance', 'finance', 4 FROM portfolio_categories WHERE slug = 'social-media';

-- =============================================
-- 3. INSERT PROJECTS
-- =============================================

-- Project 1: CalcRealty
INSERT INTO portfolio_projects (
  slug, title, client, my_role, category_id, sub_category_id,
  short_description, full_description, challenge, solution,
  cover_image_url, project_date, github_link, live_link,
  is_featured, is_published, display_order,
  meta_title, meta_description
)
SELECT 
  'calcrealty',
  'CalcRealty - Real Estate Calculator',
  'Personal Project / Real Estate Market',
  'Full-Stack Mobile Developer & Product Designer',
  pc.id,
  psc.id,
  'A PropTech financial calculator solving complex payment plans for real estate professionals.',
  'CalcRealty is a comprehensive mobile application designed specifically for the Egyptian real estate market. It addresses the critical challenge of calculating complex payment plans, installments, and unit pricing that real estate agents and customers face daily.',
  'Real estate agents in Egypt spend significant time manually calculating payment plans, down payments, installment schedules, and unit prices across different projects. This manual process is error-prone, time-consuming, and creates friction in the sales process.',
  'Developed a Flutter-based mobile app with an intuitive interface that automates all real estate financial calculations. Features include: instant payment plan generation, multiple currency support, comparison tools, and offline functionality. The app acquired 1,500+ organic users within 24 hours through community marketing.',
  '/portfolio/mobile/calcrealty-cover.webp',
  'March 2024',
  'https://github.com/omar-tnzxo/CalcRealty',
  'https://play.google.com/store/apps/details?id=com.calcrealty',
  true, -- is_featured
  true, -- is_published
  1, -- display_order
  'CalcRealty - Real Estate Financial Calculator App',
  'PropTech mobile app for real estate calculations. Built with Flutter & Dart. 1,500+ users in 24 hours.'
FROM portfolio_categories pc
CROSS JOIN project_sub_categories psc
WHERE pc.slug = 'mobile-apps' AND psc.slug = 'real-estate' AND psc.category_id = pc.id
LIMIT 1;

-- Get CalcRealty project ID for relations
DO $$
DECLARE
  calcrealty_id UUID;
BEGIN
  SELECT id INTO calcrealty_id FROM portfolio_projects WHERE slug = 'calcrealty';
  
  -- Add skills
  INSERT INTO project_skills (project_id, skill_name, display_order) VALUES
  (calcrealty_id, 'Flutter', 1),
  (calcrealty_id, 'Dart', 2),
  (calcrealty_id, 'Supabase', 3),
  (calcrealty_id, 'UI/UX Design', 4),
  (calcrealty_id, 'Firebase', 5),
  (calcrealty_id, 'Mobile Development', 6);
  
  -- Add tech stack
  INSERT INTO project_tech_stack (project_id, category, tech_name, display_order) VALUES
  (calcrealty_id, 'frontend', 'Flutter', 1),
  (calcrealty_id, 'frontend', 'Dart', 2),
  (calcrealty_id, 'frontend', 'Material Design', 3),
  (calcrealty_id, 'backend', 'Supabase', 1),
  (calcrealty_id, 'backend', 'PostgreSQL', 2),
  (calcrealty_id, 'tools', 'Android Studio', 1),
  (calcrealty_id, 'tools', 'Figma', 2),
  (calcrealty_id, 'tools', 'Git', 3);
  
  -- Add gallery
  INSERT INTO project_gallery (project_id, image_url, caption, display_order) VALUES
  (calcrealty_id, '/portfolio/mobile/calcrealty-1.webp', 'Main Dashboard', 1),
  (calcrealty_id, '/portfolio/mobile/calcrealty-2.webp', 'Payment Calculator', 2),
  (calcrealty_id, '/portfolio/mobile/calcrealty-3.webp', 'Unit Comparison', 3),
  (calcrealty_id, '/portfolio/mobile/calcrealty-4.webp', 'Results Report', 4);
  
  -- Add results
  INSERT INTO project_results (project_id, result_text, display_order) VALUES
  (calcrealty_id, '1,500+ organic downloads in first 24 hours', 1),
  (calcrealty_id, '4.8★ average rating on Google Play', 2),
  (calcrealty_id, 'Used by 50+ real estate agencies', 3),
  (calcrealty_id, 'Reduced calculation time from 10 minutes to 30 seconds', 4);
END $$;

-- Project 2: Portfolio Website
INSERT INTO portfolio_projects (
  slug, title, client, my_role, category_id, sub_category_id,
  short_description, full_description, challenge, solution,
  cover_image_url, project_date, github_link, live_link,
  is_featured, is_published, display_order,
  meta_title, meta_description
)
SELECT 
  'portfolio-website',
  'Digital Marketing Portfolio',
  'Personal Brand',
  'Full-Stack Developer & UX Designer',
  pc.id,
  psc.id,
  'A modern, animated portfolio showcasing digital marketing and development expertise.',
  'A comprehensive portfolio website built with cutting-edge web technologies to showcase my expertise in digital marketing, web development, and creative solutions. Features advanced animations, responsive design, and an intuitive user experience.',
  'Create a portfolio that stands out in a crowded market while effectively communicating technical skills, marketing expertise, and creative capabilities. The site needed to be fast, accessible, and visually impressive.',
  'Built with React, TypeScript, and Tailwind CSS, leveraging Framer Motion for smooth animations. Implemented code splitting, lazy loading, and optimized assets for maximum performance. Designed with a mobile-first approach ensuring perfect display across all devices.',
  '/portfolio/web/portfolio-cover.webp',
  'October 2025',
  'https://github.com/omar-tnzxo/omar-portfolio',
  'https://omarhassan.site',
  true,
  true,
  2,
  'Omar Hassan - Digital Marketing & Development Portfolio',
  'Professional portfolio showcasing digital marketing expertise and web development skills. Built with React, TypeScript, and Tailwind CSS.'
FROM portfolio_categories pc
CROSS JOIN project_sub_categories psc
WHERE pc.slug = 'web-development' AND psc.slug = 'portfolio' AND psc.category_id = pc.id
LIMIT 1;

-- Continue with remaining projects...
-- (Due to length constraints, I'll create a separate file for all projects)

-- =============================================
-- END OF SEED DATA
-- =============================================
