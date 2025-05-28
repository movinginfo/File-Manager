import React from 'react';
import { FolderItem, FileItem } from '../../types/files';
import TreeItem from './TreeItem';

interface TreeViewProps {
  data: FolderItem;
  onItemSelect: (item: FileItem) => void;
  selectedItem: FileItem | null;
  onContextMenu: (e: React.MouseEvent, item: FileItem) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  data,
  onItemSelect,
  selectedItem,
  onContextMenu,
}) => {
  return (
    <div className="h-full overflow-auto py-2">
      <div className="text-sm font-medium text-gray-700 mb-2 px-3">Files</div>
      <div>
        {data.children.map((item) => (
          <TreeItem
            key={item.id}
            item={item}
            level={0}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem}
            onContextMenu={onContextMenu}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;