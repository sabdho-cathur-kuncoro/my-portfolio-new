import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

interface HTMLContentProps {
    content: string;
    className?: string;
}

export default function HTMLContent({ content, className = '' }: HTMLContentProps) {
    // Check if content is HTML or markdown
    const isHTML = content.includes('<') && content.includes('>');

    let htmlContent = content;

    // Convert markdown to HTML if needed
    if (!isHTML && content) {
        try {
            htmlContent = marked(content, {
                breaks: true, // Convert line breaks to <br>
                gfm: true, // GitHub Flavored Markdown
            }) as string;
        } catch (error) {
            console.error('Error parsing markdown:', error);
            // Fallback to plain text with line breaks
            htmlContent = content.replace(/\n/g, '<br>');
        }
    }

    // Sanitize HTML to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'b', 'i'],
        ALLOWED_ATTR: ['href', 'target', 'rel']
    });

    return (
        <div
            className={`html-content ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
}
