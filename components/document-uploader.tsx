'use client';

import React from "react"

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DocumentUploaderProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  acceptedFormats?: string[];
}

export function DocumentUploader({ onFilesSelected, maxFiles = 5, acceptedFormats = ['.pdf', '.doc', '.docx', '.jpg', '.png'] }: DocumentUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

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

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      return acceptedFormats.includes(ext);
    });

    if (files.length + validFiles.length <= maxFiles) {
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onFilesSelected?.(newFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || []);
    if (files.length + selectedFiles.length <= maxFiles) {
      const newFiles = [...files, ...selectedFiles];
      setFiles(newFiles);
      onFilesSelected?.(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected?.(newFiles);
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-3">
          <Upload className="w-10 h-10 text-gray-400" />
          <div>
            <p className="font-medium text-gray-700">Drag and drop your files here</p>
            <p className="text-sm text-gray-500">or</p>
          </div>
          <label>
            <Button variant="outline" asChild>
              <span>Browse Files</span>
            </Button>
            <input
              type="file"
              multiple
              hidden
              onChange={handleFileInput}
              accept={acceptedFormats.join(',')}
              disabled={files.length >= maxFiles}
            />
          </label>
          <p className="text-xs text-gray-500">
            Max {maxFiles} files. Accepted formats: {acceptedFormats.join(', ')}
          </p>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded border border-gray-200">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button onClick={() => removeFile(index)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
