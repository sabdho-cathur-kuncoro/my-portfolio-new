'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Upload,
    Download,
    Trash2,
    Check,
    Copy,
    ExternalLink,
    AlertCircle,
    Calendar,
    HardDrive,
    Loader2
} from 'lucide-react';

interface CVMetadata {
    exists: boolean;
    fileName: string;
    url: string;
    updatedAt: string;
    fileSize: string;
}

export default function AdminCVPage() {
    const [metadata, setMetadata] = useState<CVMetadata | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchCVData = async () => {
        try {
            const res = await fetch('/api/cv');
            if (res.ok) {
                const data = await res.json();
                setMetadata(data);
            }
        } catch (err) {
            console.error('Failed to fetch CV data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCVData();
    }, []);

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size exceeds the 10MB limit.');
            return;
        }

        setError(null);
        setIsUploading(true);
        setSuccessMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/cv', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setMetadata(result.metadata);
                setSuccessMessage('CV uploaded successfully!');
                setTimeout(() => setSuccessMessage(null), 3500);
            } else {
                setError(result.error || 'Failed to upload CV');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('An error occurred during upload. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteCV = async () => {
        if (!window.confirm('Are you sure you want to delete the current CV?')) {
            return;
        }

        try {
            const res = await fetch('/api/cv', { method: 'DELETE' });
            if (res.ok) {
                setMetadata({
                    exists: false,
                    fileName: '',
                    url: '',
                    updatedAt: '',
                    fileSize: '',
                });
                setSuccessMessage('CV deleted successfully.');
                setTimeout(() => setSuccessMessage(null), 3000);
            }
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete CV.');
        }
    };

    const handleCopyLink = () => {
        const fullUrl = `${window.location.origin}/cv.pdf`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Content</p>
                <h1 className="text-3xl font-bold mb-1">Resume / CV</h1>
                <p className="text-muted text-sm">
                    Upload and manage the PDF resume displayed to global recruiters and clients.
                </p>
            </div>

            {/* Notifications */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
            {successMessage && (
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Current Status Card */}
                <div className="surface rounded-xl p-6 space-y-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-xs uppercase tracking-widest text-muted">
                                Current Active File
                            </span>
                            {metadata?.exists ? (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20">
                                    Published
                                </span>
                            ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                    No File Uploaded
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="space-y-3 py-6">
                                <div className="h-6 bg-white/[0.03] rounded animate-pulse w-3/4"></div>
                                <div className="h-4 bg-white/[0.03] rounded animate-pulse w-1/2"></div>
                            </div>
                        ) : metadata?.exists ? (
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl text-accent">
                                        <FileText className="w-7 h-7" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-semibold text-lg truncate text-foreground" title={metadata.fileName}>
                                            {metadata.fileName}
                                        </h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted mt-1 font-mono">
                                            <span className="flex items-center gap-1">
                                                <HardDrive className="w-3.5 h-3.5" />
                                                {metadata.fileSize}
                                            </span>
                                            {metadata.updatedAt && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(metadata.updatedAt).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5 text-xs font-mono text-muted truncate">
                                    Public path: <span className="text-foreground">/cv.pdf</span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted">
                                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Upload a PDF CV to enable direct downloads on your portfolio.</p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {metadata?.exists && (
                        <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                            <a
                                href="/cv.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 min-w-[120px] px-3 py-2 bg-white/10 hover:bg-white/10 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Preview
                            </a>
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className="px-3 py-2 bg-white/10 hover:bg-white/10 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                                title="Copy public link"
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy Link'}
                            </button>
                            <a
                                href="/api/cv?download=1"
                                className="px-3 py-2 bg-accent text-background rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-accent/90 transition-colors"
                                title="Download CV"
                            >
                                <Download className="w-3.5 h-3.5" />
                                Download
                            </a>
                            <button
                                type="button"
                                onClick={handleDeleteCV}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                title="Delete CV"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Upload Card */}
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`surface rounded-xl p-6 border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
                        dragActive ? 'border-accent bg-accent/5' : 'border-white/10 hover:border-white/20'
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0]);
                            }
                        }}
                    />

                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 text-accent">
                        {isUploading ? (
                            <Loader2 className="w-7 h-7 animate-spin" />
                        ) : (
                            <Upload className="w-7 h-7" />
                        )}
                    </div>

                    <h3 className="font-bold text-lg mb-1">
                        {metadata?.exists ? 'Replace Current CV' : 'Upload New CV'}
                    </h3>
                    <p className="text-muted text-xs mb-4 max-w-xs">
                        Drag and drop your PDF resume here, or click the button below to browse.
                    </p>

                    <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 bg-accent text-background rounded-lg text-sm font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                Browse File (.pdf)
                            </>
                        )}
                    </button>
                    <p className="text-[11px] text-muted mt-3 font-mono">
                        Maximum file size: 10MB · Format: PDF
                    </p>
                </div>
            </div>

            {/* Embedded Live Preview */}
            {metadata?.exists && (
                <div className="surface rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <FileText className="w-5 h-5 text-accent" />
                            Live PDF Preview
                        </h3>
                        <a
                            href="/cv.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
                        >
                            Open in new tab <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 h-[600px]">
                        <iframe
                            src="/cv.pdf#toolbar=1"
                            title="CV Preview"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
