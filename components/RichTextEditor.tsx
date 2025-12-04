'use client';

import { useRef, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import '../app/admin/quill-custom.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    minHeight = '120px'
}: RichTextEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormatting = (before: string, after: string = before) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        const beforeText = value.substring(0, start);
        const afterText = value.substring(end);

        const newText = beforeText + before + selectedText + after + afterText;
        onChange(newText);

        // Set cursor position after formatting
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + before.length + selectedText.length + after.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleBold = () => {
        insertFormatting('**');
    };

    const handleItalic = () => {
        insertFormatting('*');
    };

    const handleList = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const beforeText = value.substring(0, start);
        const afterText = value.substring(start);

        // Add bullet point at current line
        const newText = beforeText + '\n- ';
        onChange(newText + afterText);

        setTimeout(() => {
            textarea.focus();
            const newCursorPos = newText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleNumberedList = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const beforeText = value.substring(0, start);
        const afterText = value.substring(start);

        // Add numbered point at current line
        const newText = beforeText + '\n1. ';
        onChange(newText + afterText);

        setTimeout(() => {
            textarea.focus();
            const newCursorPos = newText.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            insertFormatting('[', `](${url})`);
        }
    };

    return (
        <div className="rich-text-editor-wrapper" style={{ minHeight }}>
            {/* Toolbar */}
            <div className="rich-text-toolbar glass rounded-t-lg border-b border-white/10 p-3 flex gap-2 flex-wrap">
                <button
                    type="button"
                    onClick={handleBold}
                    className="toolbar-btn px-3 py-1.5 glass rounded hover:bg-white/10 transition-colors text-sm font-semibold"
                    title="Bold (Ctrl+B)"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={handleItalic}
                    className="toolbar-btn px-3 py-1.5 glass rounded hover:bg-white/10 transition-colors text-sm italic"
                    title="Italic (Ctrl+I)"
                >
                    <em>I</em>
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button
                    type="button"
                    onClick={handleList}
                    className="toolbar-btn px-3 py-1.5 glass rounded hover:bg-white/10 transition-colors text-sm"
                    title="Bullet List"
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={handleNumberedList}
                    className="toolbar-btn px-3 py-1.5 glass rounded hover:bg-white/10 transition-colors text-sm"
                    title="Numbered List"
                >
                    1. List
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button
                    type="button"
                    onClick={handleLink}
                    className="toolbar-btn px-3 py-1.5 glass rounded hover:bg-white/10 transition-colors text-sm"
                    title="Insert Link"
                >
                    🔗 Link
                </button>
            </div>

            {/* Textarea */}
            <TextareaAutosize
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 glass rounded-b-lg focus:outline-none focus:ring-2 focus:ring-accent-purple bg-white/5 resize-none"
                minRows={5}
            />

            <p className="text-xs text-gray-500 mt-2">
                Use markdown: **bold**, *italic*, - lists, [text](url) for links
            </p>
        </div>
    );
}
