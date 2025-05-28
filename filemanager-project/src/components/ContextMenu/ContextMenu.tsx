import React, { useEffect, useRef } from 'react';
import { 
  Copy, 
  Scissors, 
  Trash2, 
  Edit, 
  Download, 
  Share2, 
  Info, 
  FolderPlus,
  FilePlus,
  RefreshCw,
  Clipboard,
  Archive
} from 'lucide-react';
import { FileItem, ContextMenuItem } from '../../types/files';

interface ContextMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  selectedItem: FileItem | null;
  onClose: () => void;
  onAction: (action: string) => void;
  hasClipboardItem?: boolean;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  position,
  selectedItem,
  onClose,
  onAction,
  hasClipboardItem = false,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const getMenuItems = (): ContextMenuItem[] => {
    const commonItems: ContextMenuItem[] = [
      {
        label: 'Copy',
        icon: 'copy',
        action: () => onAction('copy'),
      },
      {
        label: 'Cut',
        icon: 'cut',
        action: () => onAction('cut'),
      },
    ];

    if (hasClipboardItem) {
      commonItems.push({
        label: 'Paste',
        icon: 'paste',
        action: () => onAction('paste'),
      });
    }

    commonItems.push(
      {
        label: 'Rename',
        icon: 'rename',
        action: () => onAction('rename'),
      },
      {
        label: 'Delete',
        icon: 'delete',
        action: () => onAction('delete'),
        divider: true,
      }
    );

    const fileSpecificItems: ContextMenuItem[] = [
      {
        label: 'Download',
        icon: 'download',
        action: () => onAction('download'),
      },
      {
        label: 'Share',
        icon: 'share',
        action: () => onAction('share'),
      },
      {
        label: 'Compress',
        icon: 'compress',
        action: () => onAction('compress'),
        divider: true,
      },
    ];

    const folderSpecificItems: ContextMenuItem[] = [
      {
        label: 'New Folder',
        icon: 'new-folder',
        action: () => onAction('new-folder'),
      },
      {
        label: 'New File',
        icon: 'new-file',
        action: () => onAction('new-file'),
      },
      {
        label: 'Compress',
        icon: 'compress',
        action: () => onAction('compress'),
        divider: true,
      },
    ];

    const infoItem: ContextMenuItem = {
      label: 'Properties',
      icon: 'info',
      action: () => onAction('properties'),
    };

    if (!selectedItem) {
      return [
        {
          label: 'Refresh',
          icon: 'refresh',
          action: () => onAction('refresh'),
        },
        ...(hasClipboardItem ? [{
          label: 'Paste',
          icon: 'paste',
          action: () => onAction('paste'),
          divider: true,
        }] : []),
        {
          label: 'New Folder',
          icon: 'new-folder',
          action: () => onAction('new-folder'),
        },
        {
          label: 'New File',
          icon: 'new-file',
          action: () => onAction('new-file'),
        },
      ];
    }

    if (selectedItem.isDirectory) {
      return [...commonItems, ...folderSpecificItems, infoItem];
    } else {
      return [...commonItems, ...fileSpecificItems, infoItem];
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'copy':
        return <Copy className="h-4 w-4 mr-2" />;
      case 'cut':
        return <Scissors className="h-4 w-4 mr-2" />;
      case 'paste':
        return <Clipboard className="h-4 w-4 mr-2" />;
      case 'delete':
        return <Trash2 className="h-4 w-4 mr-2" />;
      case 'rename':
        return <Edit className="h-4 w-4 mr-2" />;
      case 'download':
        return <Download className="h-4 w-4 mr-2" />;
      case 'share':
        return <Share2 className="h-4 w-4 mr-2" />;
      case 'info':
        return <Info className="h-4 w-4 mr-2" />;
      case 'new-folder':
        return <FolderPlus className="h-4 w-4 mr-2" />;
      case 'new-file':
        return <FilePlus className="h-4 w-4 mr-2" />;
      case 'refresh':
        return <RefreshCw className="h-4 w-4 mr-2" />;
      case 'compress':
        return <Archive className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 min-w-[180px] animate-fade-in"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {getMenuItems().map((item, index) => (
        <React.Fragment key={index}>
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm"
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            {getIconComponent(item.icon)}
            {item.label}
          </div>
          {item.divider && <hr className="my-1 border-gray-200" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContextMenu;