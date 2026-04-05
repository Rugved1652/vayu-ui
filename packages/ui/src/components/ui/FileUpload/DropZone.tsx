// dropzone.tsx
// UI: drag-and-drop upload zone

'use client';

import React, { ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import { useFileUpload } from './hooks';

const DropZone: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const {
    addFiles,
    isDragging,
    setIsDragging,
    openDialog,
    inputRef,
    dropZoneRef,
    config,
    errorMsg,
  } = useFileUpload();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDialog();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div
      ref={dropZoneRef}
      className={`
        relative rounded-xl p-8 sm:p-12 cursor-pointer
        transition-all duration-300 ease-out
        border-2 border-dashed
        ${errorMsg ? 'border-destructive/50 bg-destructive/5' : isDragging ? 'border-brand bg-brand/10 scale-[1.01] shadow-lg shadow-brand/20' : 'border-border hover:border-brand hover:bg-brand/5'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas
        ${className}
      `}
      role="button"
      tabIndex={0}
      aria-label="Upload files by dropping them here or clicking to browse"
      aria-describedby="upload-instructions"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openDialog}
      onKeyDown={handleKeyDown}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        multiple
        accept={config.accept}
        onChange={handleChange}
        aria-label="Select files to upload"
      />

      <div
        className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-linear-to-r from-brand/10 via-transparent to-brand/10 animate-pulse" />
      </div>

      <div
        className={`relative z-10 transition-transform duration-300 ${isDragging ? 'scale-105' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropZone;
