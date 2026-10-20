import React from 'react';
import {
    Rocket,
    Laptop,
    Smartphone,
    Palette,
    Zap,
    Flame,
    Sparkles,
    Star,
    Lightbulb,
    Target,
    Users,
    BarChart3,
    Globe,
    Code2,
    Briefcase,
    Layers,
    LucideIcon
} from 'lucide-react';

export interface ProjectIconOption {
    id: string;
    label: string;
    icon: LucideIcon;
}

export const PROJECT_ICON_OPTIONS: ProjectIconOption[] = [
    { id: 'rocket', label: 'Rocket', icon: Rocket },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
    { id: 'smartphone', label: 'Smartphone', icon: Smartphone },
    { id: 'palette', label: 'Design', icon: Palette },
    { id: 'zap', label: 'Fast', icon: Zap },
    { id: 'flame', label: 'Hot', icon: Flame },
    { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
    { id: 'star', label: 'Featured', icon: Star },
    { id: 'lightbulb', label: 'Idea', icon: Lightbulb },
    { id: 'target', label: 'Target', icon: Target },
    { id: 'users', label: 'Team', icon: Users },
    { id: 'bar-chart', label: 'Analytics', icon: BarChart3 },
    { id: 'globe', label: 'Web', icon: Globe },
    { id: 'code', label: 'Code', icon: Code2 },
    { id: 'briefcase', label: 'Business', icon: Briefcase },
    { id: 'layers', label: 'Layers', icon: Layers },
];

const emojiToIconKeyMap: Record<string, string> = {
    '🚀': 'rocket',
    '💻': 'laptop',
    '📱': 'smartphone',
    '🎨': 'palette',
    '⚡': 'zap',
    '🔥': 'flame',
    '✨': 'sparkles',
    '🌟': 'star',
    '💡': 'lightbulb',
    '🎯': 'target',
    '👥': 'users',
    '📊': 'bar-chart',
    '🌐': 'globe',
};

interface ProjectIconProps {
    name?: string;
    className?: string;
    fallbackIcon?: LucideIcon;
}

export default function ProjectIcon({
    name,
    className = 'w-8 h-8 text-white',
    fallbackIcon: Fallback = Code2
}: ProjectIconProps) {
    if (!name) return <Fallback className={className} />;

    const normalizedName = emojiToIconKeyMap[name] || name.toLowerCase();
    const found = PROJECT_ICON_OPTIONS.find((opt) => opt.id === normalizedName);

    if (found) {
        const IconComponent = found.icon;
        return <IconComponent className={className} />;
    }

    return <Fallback className={className} />;
}
