import React from 'react';
import { FileItem as FileItemType, ViewMode } from '../../types/files';
import { ListViewItem, GridViewItem } from './FileItem';

interface FilesViewProps {
  files: FileItemType[];
  viewMode: ViewMode;
  selectedItem: FileItemType | null;
  onSelectItem: (file: FileItemType) => void;
  onOpenItem: (file: FileItemType) => void;
  onContextMenu: (e: React.MouseEvent, file: FileItemType) => void;
}

const FilesView: React.FC<FilesViewProps> = ({
  files,
  viewMode,
  selectedItem,
  onSelectItem,
  onOpenItem,
  onContextMenu,
}) => {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500">
        <div className="text-lg mb-2">This folder is empty</div>
        <div className="text-sm">No files or folders to display</div>
      </div>
    );
  }

  return (
    <div
      className={`h-full overflow-auto ${
        viewMode === 'list' ? 'flex flex-col' : 'p-4'
      }`}
    >
      {viewMode === 'list' ? (
        <div className="flex-1">
          <div className="sticky top-0 bg-gray-100 flex items-center px-4 py-2 border-y font-medium text-gray-700 text-sm">
            <div className="w-1/2 md:w-2/5">Name</div>
            <div className="hidden md:block w-1/5">Size</div>
            <div className="w-1/2 md:w-2/5">Date Modified</div>
          </div>
          <div>
            {files.map((file) => (
              <ListViewItem
                key={file.id}
                file={file}
                onSelect={onSelectItem}
                isSelected={selectedItem?.id === file.id}
                onDoubleClick={onOpenItem}
                onContextMenu={onContextMenu}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {files.map((file) => (
            <GridViewItem
              key={file.id}
              file={file}
              onSelect={onSelectItem}
              isSelected={selectedItem?.id === file.id}
              onDoubleClick={onOpenItem}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesView;