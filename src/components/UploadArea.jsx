import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloudIcon } from 'lucide-react';
export function UploadArea({
  onFileUpload
}) {
  const onDrop = useCallback(acceptedFiles => {
    onFileUpload(acceptedFiles);
  }, [onFileUpload]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: 20 * 1024 * 1024 // 20MB
  });
  return <div className="mb-8">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center bg-blue-50 cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-blue-300'}`}>
        <input {...getInputProps()} />
        <UploadCloudIcon className="h-16 w-16 text-blue-500 mb-4" />
        <p className="text-xl font-medium text-gray-700 mb-2">
          Drop your document here
        </p>
        <p className="text-gray-500 mb-4">
          or <span className="text-blue-500 hover:underline">browse files</span>
        </p>
        <div className="flex space-x-2 mt-2">
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            PDF
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            DOCX
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            PNG
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            JPEG
          </span>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            Max 20MB
          </span>
        </div>
      </div>
    </div>;
}