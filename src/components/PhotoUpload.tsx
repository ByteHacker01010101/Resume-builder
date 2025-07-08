import React, { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';

interface PhotoUploadProps {
  photo?: string;
  onPhotoChange: (photo: string | undefined) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ photo, onPhotoChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onPhotoChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    onPhotoChange(undefined);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Professional Photo (Optional)
      </label>
      
      <div className="flex items-center space-x-4">
        {/* Photo Preview */}
        <div className="relative">
          {photo ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="flex-1">
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 cursor-pointer ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="space-y-2">
              <Camera className="h-8 w-8 text-gray-400 mx-auto" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Upload a professional photo
                </p>
                <p className="text-xs text-gray-500">
                  Drag and drop or click to browse
                </p>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <p className="text-xs text-gray-500 mt-2">
            Recommended: Square image, 400x400px minimum. JPG, PNG supported.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;