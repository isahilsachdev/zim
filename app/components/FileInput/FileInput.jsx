'use client';
import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

const FileInput = ({ selectedImg, onChange }) => {
    const [selectedImage, setSelectedImage] = useState(selectedImg || null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState('');

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

    const validateFile = (file) => {
        if (!file) return 'Please select an image.';
        if (!ALLOWED_TYPES.includes(file.type)) return 'Please upload a valid image file (JPEG, PNG, or GIF).';
        if (file.size > MAX_FILE_SIZE) return 'File size must be less than 5MB.';
        return '';
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setError('');

        if (file) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            setSelectedImage(file);
            onChange(file);

            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleRemove = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setError('');
        onChange(null);

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div
                    className={`relative w-[64px] h-[64px] rounded-[8px] border overflow-hidden ${
                        !previewUrl ? 'bg-[#1B1D1E]' : 'bg-transparent'
                    }`}
                >
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Plus className="w-6 h-6 text-white" />
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept={ALLOWED_TYPES.join(',')}
                            multiple={false}
                            aria-label="Upload an image file"
                            onChange={handleImageUpload}
                        />
                        <span className="w-[117px] h-[40px] p-[10px] text-white bg-[#1B1D1E] rounded-lg hover:bg-gray-900 transition-colors">
                            Upload image
                        </span>
                    </label>

                    {selectedImage && (
                        <button
                            onClick={handleRemove}
                            className="w-[55px] h-[20px] text-gray-500 hover:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-700"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                </div>
            )}

            <div className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF. Max file size: 5MB
            </div>
        </div>
    );
};

export default FileInput;