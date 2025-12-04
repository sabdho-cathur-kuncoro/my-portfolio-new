-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  github TEXT,
  demo TEXT NOT NULL,
  gradient TEXT NOT NULL,
  
  -- New detailed fields
  status TEXT DEFAULT 'completed',
  start_date DATE,
  end_date DATE,
  duration TEXT,
  team_size INTEGER,
  role TEXT,
  client TEXT,
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  challenges TEXT,
  outcomes TEXT,
  screenshots TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access to projects
CREATE POLICY "Projects are viewable by everyone"
  ON projects
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Insert initial data (optional - migrate from existing data)
INSERT INTO projects (title, description, image, tags, github, demo, gradient)
VALUES
  (
    'HRIS System',
    'Comprehensive Human Resource Information System with employee management and attendance tracking built with React Native and TypeScript.',
    '👥',
    ARRAY['React Native', 'TypeScript', 'Firebase', 'REST API', 'SQLite', 'Android', 'iOS'],
    'https://github.com',
    '/projects/hris',
    'from-accent-purple to-accent-pink'
  ),
  (
    'Mobile ERP System',
    'Enterprise Resource Planning mobile application for inventory management, sales tracking, and real-time reporting built exclusively with React Native for Android only.',
    '📱',
    ARRAY['React Native', 'Redux', 'Firebase', 'REST API', 'SQLite', 'Android'],
    'https://github.com',
    '/projects/mobile-erp',
    'from-accent-cyan to-accent-green'
  )
ON CONFLICT DO NOTHING;
