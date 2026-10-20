'use client';

import { useState, useEffect, use } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';
import ProjectIcon, { PROJECT_ICON_OPTIONS } from '@/components/ProjectIcon';

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: 'rocket',
        tags: '',
        github: '',
        demo: '',
        gradient: 'from-accent-purple to-accent-pink',

        // Enhanced fields
        status: 'completed',
        start_date: '',
        end_date: '',
        duration: '',
        team_size: '',
        role: '',
        client: '',
        features: '',
        technologies: '',
        challenges: '',
        outcomes: '',
        screenshots: [] as string[],
        is_featured: false,
        display_order: '0',
    });

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects`);
            const projects = await res.json();
            const project = projects.find((p: any) => p.id === id);

            if (project) {
                setFormData({
                    ...project,
                    tags: project.tags.join(', '),
                    features: project.features ? project.features.join(', ') : '',
                    technologies: project.technologies ? project.technologies.join(', ') : '',
                    screenshots: project.screenshots || [],
                    team_size: project.team_size ? project.team_size.toString() : '',
                    display_order: project.display_order ? project.display_order.toString() : '0',
                    start_date: project.start_date || '',
                    end_date: project.end_date || '',
                    status: project.status || 'completed',
                    is_featured: project.is_featured || false,
                });
            } else {
                alert('Project not found');
                router.push('/admin/projects');
            }
        } catch (error) {
            console.error('Failed to fetch project:', error);
            alert('Failed to fetch project');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const projectData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f !== '') : [],
                technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(t => t !== '') : [],
                team_size: formData.team_size ? parseInt(formData.team_size) : null,
                display_order: parseInt(formData.display_order),
                start_date: formData.start_date || null,
                end_date: formData.end_date || null,
            };

            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Failed to update project');
            }
        } catch (error) {
            console.error('Failed to update project:', error);
            alert('Failed to update project');
        } finally {
            setIsSubmitting(false);
        }
    };

    const gradients = [
        { value: 'from-accent-purple to-accent-pink', label: 'Purple to Pink' },
        { value: 'from-accent-cyan to-accent-green', label: 'Cyan to Green' },
        { value: 'from-accent-pink to-accent-orange', label: 'Pink to Orange' },
        { value: 'from-accent-green to-accent-cyan', label: 'Green to Cyan' },
        { value: 'from-accent-purple to-accent-cyan', label: 'Purple to Cyan' },
    ];

    if (isLoading) {
        return <div className="text-center py-20 text-muted">Loading project...</div>;
    }

    return (
        <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-10">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors mb-6"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Projects
                </Link>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Edit Entry</p>
                <h1 className="text-3xl font-bold mb-1">Edit Project</h1>
                <p className="text-muted text-sm">Update project details and information.</p>
            </div>

            {/* Form */}
            <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Preview Card */}
                    <div className="surface rounded-xl overflow-hidden">
                        <div className={`h-32 bg-gradient-to-br ${formData.gradient} flex items-center justify-center`}>
                            <ProjectIcon name={formData.image} className="w-16 h-16 text-white drop-shadow-md" />
                        </div>
                    </div>

                    <div className="surface rounded-xl p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Project Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="My Awesome Project"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Description *</label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => setFormData({ ...formData, description: value })}
                                placeholder="A comprehensive description of your project..."
                                minHeight="150px"
                            />
                            <p className="text-xs text-muted mt-2">Use the toolbar to format text, add lists, and links</p>
                        </div>

                        {/* Icon Picker */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Project Icon *</label>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                {PROJECT_ICON_OPTIONS.map((option) => {
                                    const IconComponent = option.icon;
                                    const isSelected = formData.image === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            title={option.label}
                                            onClick={() => setFormData({ ...formData, image: option.id })}
                                            className={`p-3 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-colors ${
                                                isSelected
                                                    ? 'ring-2 ring-accent bg-white/10 text-accent'
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            <IconComponent className="w-6 h-6" />
                                            <span className="text-[10px] truncate max-w-full">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Tags (comma-separated) *</label>
                            <input
                                type="text"
                                required
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="React, TypeScript, Node.js"
                            />
                            <p className="text-xs text-muted mt-2">Separate tags with commas</p>
                        </div>

                        {/* Gradient */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Gradient Theme *</label>
                            <select
                                value={formData.gradient}
                                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                            >
                                {gradients.map((gradient) => (
                                    <option key={gradient.value} value={gradient.value}>
                                        {gradient.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* GitHub URL */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">GitHub URL</label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        {/* Demo URL */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Demo URL or Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.demo}
                                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="/projects/my-project or https://demo.com"
                            />
                        </div>
                    </div>

                    {/* Enhanced Project Details */}
                    <div className="surface rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold mb-4">Project Details</h3>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                            >
                                <option value="completed">Completed</option>
                                <option value="in-progress">In Progress</option>
                                <option value="planned">Planned</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        {/* Dates */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="3 months, 6 weeks, etc."
                            />
                            <p className="text-xs text-muted mt-2">Human-readable project duration</p>
                        </div>

                        {/* Team & Role */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Team Size</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.team_size}
                                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                    placeholder="5"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Your Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                    placeholder="Lead Developer, Full Stack Developer, etc."
                                />
                            </div>
                        </div>

                        {/* Client */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Client / Company</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="Company name or client"
                            />
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Key Features</label>
                            <textarea
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all min-h-[100px]"
                                placeholder="User authentication, Real-time chat, Payment integration"
                            />
                            <p className="text-xs text-muted mt-2">Separate features with commas</p>
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Technologies Used</label>
                            <textarea
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all min-h-[100px]"
                                placeholder="React, Node.js, PostgreSQL, AWS"
                            />
                            <p className="text-xs text-muted mt-2">Detailed tech stack (separate with commas)</p>
                        </div>

                        {/* Challenges */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Challenges & Solutions</label>
                            <RichTextEditor
                                value={formData.challenges}
                                onChange={(value) => setFormData({ ...formData, challenges: value })}
                                placeholder="Key challenges faced and how you solved them..."
                                minHeight="120px"
                            />
                        </div>

                        {/* Outcomes */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Outcomes & Results</label>
                            <RichTextEditor
                                value={formData.outcomes}
                                onChange={(value) => setFormData({ ...formData, outcomes: value })}
                                placeholder="Project results, metrics, impact..."
                                minHeight="120px"
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="surface rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold mb-4">Media</h3>

                        {/* Screenshots */}
                        <ImageUpload
                            value={formData.screenshots}
                            onChange={(urls) => setFormData({ ...formData, screenshots: urls })}
                            label="Screenshots"
                            helpText="Upload project screenshots (max 5MB each)"
                            maxImages={20}
                        />
                    </div>

                    {/* Display Settings */}
                    <div className="surface rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold mb-4">Display Settings</h3>

                        {/* Featured */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                className="w-5 h-5 rounded bg-white/5 border-gray-600 focus:ring-2 focus:ring-accent"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">
                                Featured Project (display on homepage)
                            </label>
                        </div>

                        {/* Display Order */}
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">Display Order</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg focus:outline-none focus:border-accent/40 transition-all"
                                placeholder="0"
                            />
                            <p className="text-xs text-muted mt-2">Lower numbers appear first</p>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Link href="/admin/projects" className="flex-1">
                            <button
                                type="button"
                                className="w-full px-6 py-2.5 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-background rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
