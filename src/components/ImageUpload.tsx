'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiLoader } from 'react-icons/fi';

interface ImageUploadProps {
  onUploadComplete: (url: string, publicId: string) => void;
  folder?: string;
  maxSize?: number; // in bytes
  accept?: string;
}

export default function ImageUpload({
  onUploadComplete,
  folder = 'art-gallery',
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = 'image/jpeg,image/jpg,image/png,image/webp,image/gif',
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',');
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type');
      return;
    }

    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onUploadComplete(data.url, data.publicId);
      } else {
        setError(data.error || 'Upload failed');
        setPreview(null);
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {!preview ? (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-gray-50 dark:bg-gray-800"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <FiLoader className="text-4xl text-purple-600 dark:text-purple-400 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <FiUpload className="text-4xl text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Click to upload image
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  JPEG, PNG, WebP, GIF (max {maxSize / (1024 * 1024)}MB)
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <FiLoader className="text-4xl text-white animate-spin" />
              </div>
            )}
          </div>
          <button
            onClick={handleRemove}
            disabled={isUploading}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiX size={20} />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
