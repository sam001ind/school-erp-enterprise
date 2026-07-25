"use client";
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Calculate size
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    setFileSize(`${sizeMB} MB`);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Here we could implement canvas resizing if needed
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange('');
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 dark:border-zinc-700 rounded-lg p-4 bg-white dark:bg-zinc-900/50 backdrop-blur-md">
      {value ? (
        <div className="relative group">
          <img src={value} alt="Uploaded preview" className="w-full h-32 object-cover rounded-md border border-zinc-200 dark:border-zinc-800" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2 backdrop-blur-sm">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white dark:bg-zinc-900/50 backdrop-blur-md text-zinc-900 dark:text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-zinc-200"
            >
              Change
            </button>
            <button 
              onClick={handleRemove}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          {fileSize && <p className="text-xs text-zinc-500 dark:text-zinc-400 dark:text-zinc-400 mt-2 text-center">File Size: {fileSize}</p>}
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800/40 dark:bg-zinc-950 dark:hover:bg-zinc-800 transition-colors"
        >
          <span className="text-2xl mb-2">📸</span>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 dark:text-zinc-300 dark:text-zinc-400">Click to upload image</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">JPEG, PNG, WEBP (Max 5MB)</p>
        </div>
      )}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}
