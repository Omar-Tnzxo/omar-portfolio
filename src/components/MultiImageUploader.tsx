import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Plus } from 'lucide-react';
import { uploadFile, PORTFOLIO_BUCKET } from '../lib/supabase';
import { toast } from 'sonner';

interface MultiImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
  maxSizeMB?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images = [],
  onImagesChange,
  label = 'معرض الصور',
  maxImages = 10,
  maxSizeMB = 5,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images limit
    if (images.length + files.length > maxImages) {
      toast.error(`يمكنك رفع ${maxImages} صور كحد أقصى`);
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`الملف ${file.name} ليس صورة`);
        continue;
      }

      // Validate file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        toast.error(`حجم ${file.name} يجب أن يكون أقل من ${maxSizeMB} ميجابايت`);
        continue;
      }

      setUploadProgress(`جاري رفع الصورة ${i + 1}/${files.length}...`);

      try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const fileExt = file.name.split('.').pop();
        const fileName = `${timestamp}-${i}-${randomStr}.${fileExt}`;
        const filePath = `projects/gallery/${fileName}`;

        // Upload file
        const { url, error } = await uploadFile(PORTFOLIO_BUCKET, filePath, file);

        if (error) {
          throw error;
        }

        if (url) {
          newImages.push(url);
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(`فشل في رفع ${file.name}`);
      }
    }

    if (newImages.length > 0) {
      onImagesChange([...images, ...newImages]);
      toast.success(`تم رفع ${newImages.length} صورة بنجاح`);
    }

    setUploading(false);
    setUploadProgress('');

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('تم حذف الصورة');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        {label}
        <span className="text-gray-500 text-xs mr-2">
          ({images.length}/{maxImages})
        </span>
      </label>

      {/* Images Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative group aspect-square bg-black/40 border border-white/10 rounded-lg overflow-hidden"
          >
            <img
              src={url}
              alt={`صورة ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add More Button */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="aspect-square bg-black/40 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-500 hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-xs text-gray-400">{uploadProgress}</span>
              </>
            ) : (
              <>
                <Plus className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-400">إضافة صورة</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        يمكنك اختيار صور متعددة دفعة واحدة. الحد الأقصى {maxSizeMB} MB لكل صورة
      </p>
    </div>
  );
};

export default MultiImageUploader;
