import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File } from 'lucide-react';
import { FileItem, FolderItem } from '../../types/files';

interface TreeItemProps {
  item: FileItem;
  level: number;
  onItemSelect: (item: FileItem) => void;
  selectedItem: FileItem | null;
  onContextMenu: (e: React.MouseEvent, item: FileItem) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  item,
  level,
  onItemSelect,
  selectedItem,
  onContextMenu,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isDirectory) {
      setExpanded(!expanded);
    }
  };

  const handleSelect = () => {
    onItemSelect(item);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onContextMenu(e, item);
  };

  const isSelected = selectedItem?.id === item.id;

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 rounded cursor-pointer ${
          isSelected ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${level * 12 + 4}px` }}
        onClick={handleSelect}
        onContextMenu={handleContextMenu}
      >
        <div className="mr-1" onClick={handleToggle}>
          {item.isDirectory ? (
            expanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )
          ) : (
            <span className="w-4" />
          )}
        </div>
        <div className="mr-2">
          {item.isDirectory ? (
            <img src="/folder-96.svg" className="h-4 w-4\" alt="Folder" />
          ) : (
            <File
              className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}
            />
          )}
        </div>
        <div className="truncate text-sm">{item.name}</div>
      </div>

      {expanded && item.isDirectory && (
        <div className="ml-2">
          {(item as FolderItem).children.map((child) => (
            <TreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onItemSelect={onItemSelect}
              selectedItem={selectedItem}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;