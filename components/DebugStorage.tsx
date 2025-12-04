'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DebugStorage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testStorageAccess = async () => {
        setLoading(true);
        try {
            const supabase = createClient();

            // Test 1: Check authentication
            const { data: { session } } = await supabase.auth.getSession();

            // Test 2: List files in bucket
            const { data: files, error: listError } = await supabase.storage
                .from('project-images')
                .list('screenshots', {
                    limit: 10,
                    offset: 0,
                });

            // Test 3: Get a public URL
            let publicUrl = null;
            if (files && files.length > 0) {
                const { data } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(`screenshots/${files[0].name}`);
                publicUrl = data.publicUrl;
            }

            setResult({
                authenticated: !!session,
                user: session?.user?.email || 'Not logged in',
                filesCount: files?.length || 0,
                files: files?.map(f => f.name) || [],
                listError: listError?.message || null,
                samplePublicUrl: publicUrl,
            });
        } catch (error: any) {
            setResult({
                error: error.message || 'Unknown error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={testStorageAccess}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 disabled:opacity-50"
            >
                {loading ? 'Testing...' : 'Debug Storage'}
            </button>

            {result && (
                <div className="mt-2 p-4 bg-gray-900 text-white rounded-lg shadow-lg max-w-md max-h-96 overflow-auto text-xs">
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
