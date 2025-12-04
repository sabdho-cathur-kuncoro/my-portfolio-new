-- Migration script to add new fields to existing projects table
-- Run this in your Supabase SQL Editor if you already have a projects table

-- Add new columns to existing projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'completed',
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS team_size INTEGER,
ADD COLUMN IF NOT EXISTS role TEXT,
ADD COLUMN IF NOT EXISTS client TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS technologies TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS challenges TEXT,
ADD COLUMN IF NOT EXISTS outcomes TEXT,
ADD COLUMN IF NOT EXISTS screenshots TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Optional: Mark existing projects as featured (adjust as needed)
-- UPDATE projects SET is_featured = true WHERE id IN ('project-id-1', 'project-id-2');

-- Optional: Set display order for existing projects
-- UPDATE projects SET display_order = 1 WHERE title = 'HRIS System';
-- UPDATE projects SET display_order = 2 WHERE title = 'Mobile ERP System';
