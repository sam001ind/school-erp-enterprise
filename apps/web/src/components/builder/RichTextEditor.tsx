"use client";
import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900/50 backdrop-blur-md">
      <div className="bg-zinc-50 dark:bg-zinc-950 dark:bg-zinc-950 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 p-2 flex flex-wrap gap-1">
        <button onClick={() => exec('bold')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 font-bold" title="Bold">B</button>
        <button onClick={() => exec('italic')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 italic" title="Italic">I</button>
        <button onClick={() => exec('underline')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 underline" title="Underline">U</button>
        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1 self-center" />
        <button onClick={() => exec('insertUnorderedList')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300" title="Bullet List">• List</button>
        <button onClick={() => exec('insertOrderedList')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300" title="Number List">1. List</button>
        <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1 self-center" />
        <button onClick={() => { const url = prompt('Enter URL'); if (url) exec('createLink', url); }} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300" title="Link">🔗</button>
        <button onClick={() => exec('formatBlock', 'H3')} className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-300 font-bold" title="Heading">H</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleChange}
        onBlur={handleChange}
        className="p-3 min-h-[120px] max-h-[300px] overflow-y-auto outline-none text-sm text-zinc-800 dark:text-zinc-200 dark:text-zinc-200 dark:text-zinc-200"

      />
    </div>
  );
}
