'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Folder, File, Download, Trash2, Search, Plus, Home } from 'lucide-react';
import { mockDocuments } from '@/lib/mock-data';

type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modifiedDate: string;
  category?: string;
};

export default function DocumentsPage() {
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [searchQuery, setSearchQuery] = useState('');

  const files: FileItem[] = [
    { id: '1', name: 'Recruitment', type: 'folder', modifiedDate: '2024-02-05' },
    { id: '2', name: 'Contracts', type: 'folder', modifiedDate: '2024-02-04' },
    { id: '3', name: 'Training Documents', type: 'folder', modifiedDate: '2024-02-03' },
    { id: '4', name: 'Policies', type: 'folder', modifiedDate: '2024-02-02' },
    { id: '5', name: 'Employee_Handbook.pdf', type: 'file', size: '2.4 MB', modifiedDate: '2024-02-01', category: 'PDF' },
    { id: '6', name: 'Code_of_Conduct.docx', type: 'file', size: '1.2 MB', modifiedDate: '2024-01-31', category: 'Document' },
  ];

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <Folder className="w-6 h-6 text-amber-400" />;
    }
    switch (file.category) {
      case 'PDF':
        return <File className="w-6 h-6 text-destructive" />;
      case 'Document':
        return <File className="w-6 h-6 text-blue-400" />;
      default:
        return <File className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getFileTypeColor = (category?: string) => {
    switch (category) {
      case 'PDF':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Document':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-secondary/30 text-muted-foreground border-border/30';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="accent-line-top pb-6">
        <h1 className="text-4xl font-bold text-foreground">Documents</h1>
        <p className="text-muted-foreground mt-2">Manage and organize your organization documents</p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground rounded-lg"
          onClick={() => setCurrentPath(['root'])}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        {currentPath.slice(1).map((path, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-muted-foreground">/</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground rounded-lg"
              onClick={() => setCurrentPath(currentPath.slice(0, idx + 2))}
            >
              {path}
            </Button>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-secondary/40 border-border/50 rounded-lg focus:border-accent"
          />
        </div>
        <Button className="bg-gradient-to-r from-accent via-accent to-[hsl(var(--accent-secondary))] hover:from-accent/90 hover:via-accent/90 hover:to-[hsl(var(--accent-secondary))/90] text-white rounded-lg gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
        <Button className="bg-accent hover:bg-accent/90 text-white rounded-lg gap-2">
          <Plus className="w-4 h-4" />
          New Folder
        </Button>
      </div>

      {/* File Browser */}
      <Card className="bg-card border-border/50 rounded-xl overflow-hidden">
        {/* File List Header */}
        <div className="px-6 py-4 border-b border-border/30 bg-secondary/30">
          <div className="grid grid-cols-12 gap-4 text-xs font-600 text-foreground">
            <div className="col-span-5 flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Name</span>
            </div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* File List Items */}
        <div className="divide-y divide-border/30">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No documents found</p>
            </div>
          ) : (
            filteredFiles.map((file) => (
              <div
                key={file.id}
                className="px-6 py-4 hover:bg-secondary/20 transition-colors border-b border-border/10 last:border-0"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Name */}
                  <div className="col-span-5 flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-500 text-foreground truncate hover:underline cursor-pointer">
                        {file.name}
                      </p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="col-span-2">
                    <span className={`text-xs px-2 py-1 rounded border ${getFileTypeColor(file.category)}`}>
                      {file.type === 'folder' ? 'Folder' : file.category || 'File'}
                    </span>
                  </div>

                  {/* Size */}
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {file.size || '—'}
                  </div>

                  {/* Modified Date */}
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {new Date(file.modifiedDate).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center gap-2">
                    {file.type === 'file' && (
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg p-1">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 rounded-lg p-1">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-card border-border/50 rounded-xl">
          <p className="text-muted-foreground text-sm font-500 mb-2">Total Documents</p>
          <p className="text-3xl font-bold text-foreground">{files.filter((f) => f.type === 'file').length}</p>
        </Card>
        <Card className="p-6 bg-card border-border/50 rounded-xl">
          <p className="text-muted-foreground text-sm font-500 mb-2">Total Folders</p>
          <p className="text-3xl font-bold text-foreground">{files.filter((f) => f.type === 'folder').length}</p>
        </Card>
        <Card className="p-6 bg-card border-border/50 rounded-xl">
          <p className="text-muted-foreground text-sm font-500 mb-2">Total Size</p>
          <p className="text-3xl font-bold text-foreground">3.6 MB</p>
        </Card>
      </div>
    </div>
  );
}
