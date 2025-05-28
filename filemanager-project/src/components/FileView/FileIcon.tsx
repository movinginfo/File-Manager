import React from 'react';
import { File, FileText, FileImage, FileMusic, FileVideo, FileCode, File as FilePdf, FileArchive, Download, FileSpreadsheet } from 'lucide-react';

interface FileIconProps {
  fileType: string;
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ fileType, className = 'h-5 w-5' }) => {
  const getIconByFileType = () => {
    const type = fileType.toLowerCase();
    
    if (type === 'pdf') {
      return <FilePdf className={`${className} text-red-500`} />;
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(type)) {
      return <FileImage className={`${className} text-purple-500`} />;
    } else if (['mp3', 'wav', 'ogg', 'm4a', 'flac', 'm3u'].includes(type)) {
      return <FileMusic className={`${className} text-blue-500`} />;
    } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(type)) {
      return <FileVideo className={`${className} text-pink-500`} />;
    } else if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'xml', 'py', 'java', 'c', 'cpp'].includes(type)) {
      return <FileCode className={`${className} text-green-500`} />;
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(type)) {
      return <FileArchive className={`${className} text-amber-500`} />;
    } else if (['exe', 'msi', 'dmg', 'deb', 'rpm'].includes(type)) {
      return <Download className={`${className} text-gray-500`} />;
    } else if (['doc', 'docx', 'txt', 'rtf'].includes(type)) {
      return <FileText className={`${className} text-blue-600`} />;
    } else if (['xls', 'xlsx', 'csv'].includes(type)) {
      return <FileSpreadsheet className={`${className} text-green-600`} />;
    } else {
      return <File className={`${className} text-gray-500`} />;
    }
  };

  return getIconByFileType();
};

export default FileIcon;