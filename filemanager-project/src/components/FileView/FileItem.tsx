import React from 'react';
import { File } from 'lucide-react';
import { FileItem as FileItemType } from '../../types/files';
import FileIcon from './FileIcon';

interface FileItemProps {
  file: FileItemType;
  onSelect: (file: FileItemType) => void;
  isSelected: boolean;
  onDoubleClick: (file: FileItemType) => void;
  onContextMenu: (e: React.MouseEvent, file: FileItemType) => void;
}

export const ListViewItem: React.FC<FileItemProps> = ({
  file,
  onSelect,
  isSelected,
  onDoubleClick,
  onContextMenu,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  return (
    <div
      className={`flex items-center px-4 py-2 border-b cursor-pointer transition-colors duration-150 select-none ${
        isSelected ? 'bg-blue-50 border-blue-100' : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(file)}
      onDoubleClick={() => onDoubleClick(file)}
      onContextMenu={(e) => onContextMenu(e, file)}
    >
      <div className="flex items-center w-1/2 md:w-2/5">
        <div className="mr-3">
          {file.isDirectory ? (
            <img src="/folder-96.svg" className="h-5 w-5\" alt="Folder" />
          ) : (
            <FileIcon fileType={file.type} />
          )}
        </div>
        <div className="truncate font-medium text-gray-800">{file.name}</div>
      </div>
      <div className="hidden md:block w-1/5 text-sm text-gray-600">
        {file.isDirectory ? '--' : formatFileSize(file.size)}
      </div>
      <div className="w-1/2 md:w-2/5 text-sm text-gray-600 truncate">
        {formatDate(file.modified)}
      </div>
    </div>
  );
};

export const GridViewItem: React.FC<FileItemProps> = ({
  file,
  onSelect,
  isSelected,
  onDoubleClick,
  onContextMenu,
}) => {
  return (
    <div
      className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-150 select-none ${
        isSelected
          ? 'bg-blue-50 border-blue-200 shadow-sm'
          : 'hover:bg-gray-50 border-transparent'
      }`}
      onClick={() => onSelect(file)}
      onDoubleClick={() => onDoubleClick(file)}
      onContextMenu={(e) => onContextMenu(e, file)}
    >
      <div className="mb-2 p-3 rounded-lg bg-gray-50 flex items-center justify-center">
        {file.isDirectory ? (
          <img src="/folder-96.svg" className="h-10 w-10\" alt="Folder" />
        ) : (
          <FileIcon fileType={file.type} className="h-10 w-10" />
        )}
      </div>
      <div className="text-center">
        <div className="w-24 truncate text-sm font-medium text-gray-800">{file.name}</div>
        <div className="text-xs text-gray-500">
          {file.isDirectory ? 'Folder' : file.type.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default { ListViewItem, GridViewItem };