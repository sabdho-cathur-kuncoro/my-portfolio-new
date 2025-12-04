'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';

export default function NewProjectPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '🚀',
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

            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Failed to create project');
            }
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to create project');
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

    const emojiOptions = ['🚀', '💻', '📱', '🎨', '⚡', '🔥', '✨', '🌟', '💡', '🎯', '👥', '📊'];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/projects">
                    <motion.button
                        className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ x: -5 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </motion.button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">New Project</h1>
                    <p className="text-gray-400">Add a new project to your portfolio</p>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Preview Card */}
                    <div className="glass rounded-2xl overflow-hidden">
                        <div className={`h-32 bg-gradient-to-br ${formData.gradient} flex items-center justify-center`}>
                            <span className="text-6xl">{formData.image}</span>
                        </div>
                    </div>

                    <div className="glass rounded-2xl p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Project Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="My Awesome Project"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Description *</label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => setFormData({ ...formData, description: value })}
                                placeholder="A comprehensive description of your project..."
                                minHeight="150px"
                            />
                            <p className="text-xs text-gray-400 mt-2">Use the toolbar to format text, add lists, and links</p>
                        </div>

                        {/* Emoji Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Icon *</label>
                            <div className="grid grid-cols-6 gap-2">
                                {emojiOptions.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: emoji })}
                                        className={`p-3 glass rounded-lg text-3xl hover:bg-white/10 transition-colors ${formData.image === emoji ? 'ring-2 ring-accent-purple' : ''
                                            }`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tags (comma-separated) *</label>
                            <input
                                type="text"
                                required
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="React, TypeScript, Node.js"
                            />
                            <p className="text-xs text-gray-400 mt-2">Separate tags with commas</p>
                        </div>

                        {/* Gradient */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Gradient Theme *</label>
                            <select
                                value={formData.gradient}
                                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
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
                            <label className="block text-sm font-medium mb-2">GitHub URL</label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        {/* Demo URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Demo URL or Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.demo}
                                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="/projects/my-project or https://demo.com"
                            />
                        </div>
                    </div>

                    {/* Enhanced Project Details */}
                    <div className="glass rounded-2xl p-6 space-y-6">
                        <h3 className="text-xl font-bold mb-4">Project Details</h3>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
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
                                <label className="block text-sm font-medium mb-2">Start Date</label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">End Date</label>
                                <input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="3 months, 6 weeks, etc."
                            />
                            <p className="text-xs text-gray-400 mt-2">Human-readable project duration</p>
                        </div>

                        {/* Team & Role */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Team Size</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.team_size}
                                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                    placeholder="5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Your Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                    placeholder="Lead Developer, Full Stack Developer, etc."
                                />
                            </div>
                        </div>

                        {/* Client */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Client / Company</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="Company name or client"
                            />
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Key Features</label>
                            <textarea
                                value={formData.features}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5 min-h-[100px]"
                                placeholder="User authentication, Real-time chat, Payment integration"
                            />
                            <p className="text-xs text-gray-400 mt-2">Separate features with commas</p>
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Technologies Used</label>
                            <textarea
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5 min-h-[100px]"
                                placeholder="React, Node.js, PostgreSQL, AWS"
                            />
                            <p className="text-xs text-gray-400 mt-2">Detailed tech stack (separate with commas)</p>
                        </div>

                        {/* Challenges */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Challenges & Solutions</label>
                            <RichTextEditor
                                value={formData.challenges}
                                onChange={(value) => setFormData({ ...formData, challenges: value })}
                                placeholder="Key challenges faced and how you solved them..."
                                minHeight="120px"
                            />
                        </div>

                        {/* Outcomes */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Outcomes & Results</label>
                            <RichTextEditor
                                value={formData.outcomes}
                                onChange={(value) => setFormData({ ...formData, outcomes: value })}
                                placeholder="Project results, metrics, impact..."
                                minHeight="120px"
                            />
                        </div>
                    </div>

                    {/* Media & Links */}
                    <div className="glass rounded-2xl p-6 space-y-6">
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
                    <div className="glass rounded-2xl p-6 space-y-6">
                        <h3 className="text-xl font-bold mb-4">Display Settings</h3>

                        {/* Featured */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                className="w-5 h-5 rounded bg-white/5 border-gray-600 focus:ring-2 focus:ring-accent-purple"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium cursor-pointer">
                                Featured Project (display on homepage)
                            </label>
                        </div>

                        {/* Display Order */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Display Order</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.display_order}
                                onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5"
                                placeholder="0"
                            />
                            <p className="text-xs text-gray-400 mt-2">Lower numbers appear first</p>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Link href="/admin/projects" className="flex-1">
                            <button
                                type="button"
                                className="w-full px-6 py-3 glass rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                        </Link>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-cyber text-white rounded-lg hover:shadow-lg hover:shadow-accent-purple/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                            <Save className="w-5 h-5" />
                            {isSubmitting ? 'Creating...' : 'Create Project'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
}
