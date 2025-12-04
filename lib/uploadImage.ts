import { createClient } from './supabase/client';

export interface UploadResult {
    url: string;
    path: string;
}

export interface UploadError {
    error: string;
}

/**
 * Upload an image to Supabase Storage
 * @param file - The file to upload
 * @param folder - Optional folder path within the bucket (default: 'screenshots')
 * @returns Promise with the public URL or error
 */
export async function uploadImage(
    file: File,
    folder: string = 'screenshots'
): Promise<UploadResult | UploadError> {
    try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            return { error: 'File must be an image' };
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            return { error: 'File size must be less than 5MB' };
        }

        const supabase = createClient();

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${randomString}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from('project-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Upload error:', error);
            return { error: error.message || 'Failed to upload image' };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('project-images')
            .getPublicUrl(data.path);

        return {
            url: publicUrl,
            path: data.path,
        };
    } catch (error) {
        console.error('Upload exception:', error);
        return { error: 'An unexpected error occurred during upload' };
    }
}

/**
 * Delete an image from Supabase Storage
 * @param path - The storage path of the image to delete
 * @returns Promise with success status
 */
export async function deleteImage(path: string): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = createClient();

        const { error } = await supabase.storage
            .from('project-images')
            .remove([path]);

        if (error) {
            console.error('Delete error:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Delete exception:', error);
        return { success: false, error: 'An unexpected error occurred during deletion' };
    }
}

/**
 * Extract the storage path from a public URL
 * @param url - The public URL
 * @returns The storage path or null if invalid
 */
export function extractPathFromUrl(url: string): string | null {
    try {
        // URL format: https://{project}.supabase.co/storage/v1/object/public/project-images/{path}
        const match = url.match(/\/project-images\/(.+)$/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}
