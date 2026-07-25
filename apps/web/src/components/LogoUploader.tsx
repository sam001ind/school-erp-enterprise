"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Check, Image as ImageIcon } from "lucide-react";
import { updateTenantLogo } from "@/app/actions/tenant";
import { useRouter } from "next/navigation";

interface LogoUploaderProps {
  tenantId: string;
  currentLogoUrl: string | null;
  onUploadSuccess?: (url: string) => void;
}

export function LogoUploader({ tenantId, currentLogoUrl, onUploadSuccess }: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file.");
      return;
    }
    
    // Validate file size (e.g., max 2MB since it's going to Base64)
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target && event.target.result) {
        const base64String = event.target.result as string;
        setPreviewUrl(base64String);
        await uploadLogo(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadLogo = async (base64String: string) => {
    setIsUploading(true);
    setSuccess(false);
    
    try {
      const result = await updateTenantLogo(tenantId, base64String);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        if (onUploadSuccess) onUploadSuccess(base64String);
        router.refresh();
      } else {
        alert("Failed to update logo: " + result.error);
        setPreviewUrl(currentLogoUrl);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An unexpected error occurred.");
      setPreviewUrl(currentLogoUrl);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file input
    
    if (window.confirm("Are you sure you want to remove the logo?")) {
      setPreviewUrl(null);
      setIsUploading(true);
      try {
        await updateTenantLogo(tenantId, "");
        if (onUploadSuccess) onUploadSuccess("");
        router.refresh();
      } catch (error) {
        console.error("Error removing logo:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        Institution Logo
      </label>
      
      <div 
        className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : previewUrl 
              ? 'border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800/50 hover:bg-slate-100 dark:hover:bg-zinc-800' 
              : 'border-slate-300 dark:border-zinc-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/png, image/jpeg, image/svg+xml" 
          className="hidden" 
        />
        
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Uploading...</p>
          </div>
        )}

        {previewUrl ? (
          <div className="relative group w-full flex flex-col items-center">
            <div className="w-32 h-32 relative rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 shadow-sm bg-white dark:bg-zinc-900 flex items-center justify-center p-2 mb-4">
              <img 
                src={previewUrl} 
                alt="Tenant Logo Preview" 
                className="max-w-full max-h-full object-contain"
              />
              
              <button 
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                title="Remove logo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              {success ? (
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-4 h-4" /> Updated successfully
                </span>
              ) : (
                <>Click or drag to replace image</>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SVG, PNG, or JPG (max. 2MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
