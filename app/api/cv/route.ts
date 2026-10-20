import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'cv.json');
const PUBLIC_CV_PATH = path.join(process.cwd(), 'public', 'cv.pdf');

interface CVMetadata {
    exists: boolean;
    fileName: string;
    url: string;
    updatedAt: string;
    fileSize: string;
}

async function getCVMetadata(): Promise<CVMetadata> {
    try {
        const content = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(content);
    } catch {
        try {
            const stat = await fs.stat(PUBLIC_CV_PATH);
            return {
                exists: true,
                fileName: 'Sabdho_Cathur_Kuncoro_Resume.pdf',
                url: '/cv.pdf',
                updatedAt: stat.mtime.toISOString(),
                fileSize: `${(stat.size / 1024).toFixed(1)} KB`,
            };
        } catch {
            return {
                exists: false,
                fileName: '',
                url: '',
                updatedAt: '',
                fileSize: '',
            };
        }
    }
}

export async function GET(request: NextRequest) {
    const metadata = await getCVMetadata();

    // Check if download is requested directly
    const shouldDownload = request.nextUrl.searchParams.get('download') === '1';
    if (shouldDownload && metadata.exists) {
        try {
            const fileBuffer = await fs.readFile(PUBLIC_CV_PATH);
            return new NextResponse(fileBuffer, {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${metadata.fileName || 'Sabdho_Cathur_Kuncoro_Resume.pdf'}"`,
                },
            });
        } catch (err) {
            console.error('Failed to read CV for download:', err);
        }
    }

    return NextResponse.json(metadata);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate PDF type
        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
            return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
        }

        // Limit size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure public folder exists and write file
        await fs.mkdir(path.join(process.cwd(), 'public'), { recursive: true });
        await fs.writeFile(PUBLIC_CV_PATH, buffer);

        // Format file size
        const sizeInKb = file.size / 1024;
        const formattedSize = sizeInKb > 1024 
            ? `${(sizeInKb / 1024).toFixed(2)} MB` 
            : `${sizeInKb.toFixed(1)} KB`;

        const metadata: CVMetadata = {
            exists: true,
            fileName: file.name,
            url: '/cv.pdf',
            updatedAt: new Date().toISOString(),
            fileSize: formattedSize,
        };

        // Ensure data folder exists and save metadata
        await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
        await fs.writeFile(DATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');

        return NextResponse.json({
            success: true,
            metadata,
        });
    } catch (error) {
        console.error('Error uploading CV:', error);
        return NextResponse.json({ error: 'Failed to upload CV file' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        try {
            await fs.unlink(PUBLIC_CV_PATH);
        } catch {
            // Ignore if file doesn't exist
        }

        const metadata: CVMetadata = {
            exists: false,
            fileName: '',
            url: '',
            updatedAt: '',
            fileSize: '',
        };

        await fs.writeFile(DATA_PATH, JSON.stringify(metadata, null, 2), 'utf-8');

        return NextResponse.json({ success: true, metadata });
    } catch (error) {
        console.error('Error deleting CV:', error);
        return NextResponse.json({ error: 'Failed to delete CV file' }, { status: 500 });
    }
}
