'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage, extractPathFromUrl } from '@/lib/uploadImage';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
    value: string[]; // Array of image URLs
    onChange: (urls: string[]) => void;
    maxImages?: number;
    label?: string;
    helpText?: string;
}

interface UploadingImage {
    id: string;
    file: File;
    preview: string;
    progress: number;
}

export default function ImageUpload({
    value = [],
    onChange,
    maxImages = 10,
    label = 'Images',
    helpText = 'Upload images (max 5MB each)',
}: ImageUploadProps) {
    const [uploading, setUploading] = useState<UploadingImage[]>([]);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setError(null);

        // Check if adding these files would exceed max
        if (value.length + files.length > maxImages) {
            setError(`Maximum ${maxImages} images allowed`);
            return;
        }

        // Create uploading entries with previews
        const newUploading: UploadingImage[] = Array.from(files).map((file) => ({
            id: Math.random().toString(36).substring(2),
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
        }));

        setUploading((prev) => [...prev, ...newUploading]);

        // Collect all uploaded URLs
        const uploadedUrls: string[] = [];

        // Upload each file
        for (const uploadItem of newUploading) {
            try {
                const result = await uploadImage(uploadItem.file);

                if ('error' in result) {
                    setError(result.error);
                    setUploading((prev) => prev.filter((u) => u.id !== uploadItem.id));
                } else {
                    // Collect the URL
                    uploadedUrls.push(result.url);
                    // Remove from uploading
                    setUploading((prev) => prev.filter((u) => u.id !== uploadItem.id));
                }
            } catch (err) {
                console.error('Upload failed:', err);
                setError('Upload failed');
                setUploading((prev) => prev.filter((u) => u.id !== uploadItem.id));
            } finally {
                // Clean up preview URL
                URL.revokeObjectURL(uploadItem.preview);
            }
        }

        // Update state with all uploaded URLs at once
        if (uploadedUrls.length > 0) {
            onChange([...value, ...uploadedUrls]);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleRemove = async (url: string) => {
        // Extract path and delete from storage
        const path = extractPathFromUrl(url);
        if (path) {
            await deleteImage(path);
        }

        // Remove from value array
        onChange(value.filter((u) => u !== url));
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>

            {/* Upload Area */}
            {value.length < maxImages && (
                <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                        ? 'border-accent-purple bg-accent-purple/10'
                        : 'border-gray-600 hover:border-gray-500'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />

                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-300 mb-2">
                        Drag and drop images here, or{' '}
                        <button
                            type="button"
                            onClick={handleButtonClick}
                            className="text-accent-purple hover:text-accent-pink transition-colors"
                        >
                            browse
                        </button>
                    </p>
                    <p className="text-sm text-gray-400">{helpText}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm"
                >
                    {error}
                </motion.div>
            )}

            {/* Uploading Images */}
            {uploading.length > 0 && (
                <div className="mt-4 space-y-2">
                    {uploading.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 glass rounded-lg"
                        >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                                <img
                                    src={item.preview}
                                    alt="Uploading"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-300 truncate">{item.file.name}</p>
                                <p className="text-xs text-gray-400">Uploading...</p>
                            </div>
                            <Loader2 className="w-5 h-5 text-accent-purple animate-spin flex-shrink-0" />
                        </div>
                    ))}
                </div>
            )}

            {/* Uploaded Images */}
            {value.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {value.map((url, index) => (
                            <motion.div
                                key={url}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group aspect-video rounded-lg overflow-hidden bg-white/5"
                            >
                                <img
                                    src={url}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector('.error-placeholder')) {
                                            const errorDiv = document.createElement('div');
                                            errorDiv.className = 'error-placeholder w-full h-full flex items-center justify-center text-gray-400 text-xs';
                                            errorDiv.textContent = 'Preview unavailable';
                                            parent.appendChild(errorDiv);
                                        }
                                    }}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(url)}
                                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Image Count */}
            {value.length > 0 && (
                <p className="mt-2 text-xs text-gray-400">
                    {value.length} / {maxImages} images uploaded
                </p>
            )}
        </div>
    );
}
