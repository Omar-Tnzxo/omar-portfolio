import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadFile, PORTFOLIO_BUCKET } from '../lib/supabase';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  existingUrl?: string;
  label?: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadComplete,
  existingUrl = '',
  label = 'تحميل صورة',
  required = false,
  accept = 'image/*',
  maxSizeMB = 5,
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(existingUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('يرجى اختيار ملف صورة أو فيديو فقط');
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`حجم الملف يجب أن يكون أقل من ${maxSizeMB} ميجابايت`);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    try {
      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomStr}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      // Upload file
      const { url, error } = await uploadFile(PORTFOLIO_BUCKET, filePath, file);

      if (error) {
        throw error;
      }

      if (url) {
        onUploadComplete(url);
        toast.success('تم رفع الملف بنجاح');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('فشل في رفع الملف');
      setPreview(existingUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Preview or Upload Area */}
      <div className="relative">
        {preview ? (
          // Image Preview
          <div className="relative group">
            <div className="relative w-full h-48 bg-black/40 border border-white/10 rounded-lg overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  تغيير
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Upload Area
          <button
            type="button"
            onClick={handleClick}
            disabled={uploading}
            className="w-full h-48 bg-black/40 border-2 border-dashed border-white/20 rounded-lg hover:border-blue-500 hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <span className="text-sm text-gray-400">جاري الرفع...</span>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-400">
                  اضغط لاختيار ملف أو اسحب الملف هنا
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, GIF, WebP حتى {maxSizeMB} MB
                </span>
              </>
            )}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
