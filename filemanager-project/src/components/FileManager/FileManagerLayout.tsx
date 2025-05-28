import React, { useState, useEffect } from 'react';
import TreeView from '../TreeView/TreeView';
import FilesView from '../FileView/FilesView';
import ContextMenu from '../ContextMenu/ContextMenu';
import Breadcrumbs from './Breadcrumbs';
import Toolbar from './Toolbar';
import { FileItem, FolderItem, ViewMode } from '../../types/files';
import { mockFileSystem } from '../../data/mockData';

const FileManagerLayout: React.FC = () => {
  const [currentFolder, setCurrentFolder] = useState<FolderItem>(mockFileSystem);
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedFiles, setDisplayedFiles] = useState<FileItem[]>(mockFileSystem.children);
  const [clipboard, setClipboard] = useState<{ item: FileItem; action: 'copy' | 'cut' } | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const filtered = currentFolder.children.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedFiles(filtered);
    } else {
      setDisplayedFiles(currentFolder.children);
    }
  }, [searchQuery, currentFolder]);

  const handleItemSelect = (item: FileItem) => {
    setSelectedItem(item);
  };

  const handleItemOpen = (item: FileItem) => {
    if (item.isDirectory) {
      navigateToFolder(item.path);
    }
  };

  const navigateToFolder = (path: string) => {
    let targetFolder = mockFileSystem;
    
    if (path !== '/') {
      const parts = path.split('/').filter(Boolean);
      let current = mockFileSystem;
      
      for (const part of parts) {
        const found = current.children.find(
          (child) => child.isDirectory && child.name === part
        ) as FolderItem;
        
        if (found) {
          current = found;
        } else {
          console.error(`Folder not found: ${part}`);
          return;
        }
      }
      
      targetFolder = current;
    }
    
    setCurrentFolder(targetFolder);
    setCurrentPath(path);
    setSelectedItem(null);
  };

  const handleContextMenu = (e: React.MouseEvent, item: FileItem | null) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleContextMenuAction = (action: string) => {
    if (!selectedItem && !['paste', 'new-folder', 'new-file', 'refresh'].includes(action)) return;

    switch (action) {
      case 'copy':
        setClipboard({ item: selectedItem!, action: 'copy' });
        break;
      case 'cut':
        setClipboard({ item: selectedItem!, action: 'cut' });
        break;
      case 'paste':
        if (clipboard) {
          const newName = `${clipboard.item.name}${clipboard.action === 'copy' ? ' (Copy)' : ''}`;
          const newItem = {
            ...clipboard.item,
            id: crypto.randomUUID(),
            name: newName,
            path: `${currentPath}/${newName}`,
          };
          setDisplayedFiles([...displayedFiles, newItem]);
          if (clipboard.action === 'cut') {
            setClipboard(null);
          }
        }
        break;
      case 'delete':
        setDisplayedFiles(displayedFiles.filter(file => file.id !== selectedItem!.id));
        setSelectedItem(null);
        break;
      case 'rename':
        const newName = prompt('Enter new name:', selectedItem!.name);
        if (newName && newName !== selectedItem!.name) {
          setDisplayedFiles(displayedFiles.map(file => 
            file.id === selectedItem!.id 
              ? { ...file, name: newName, path: `${currentPath}/${newName}` }
              : file
          ));
        }
        break;
      case 'share':
        const shareUrl = `https://example.com/share/${selectedItem!.id}`;
        alert(`Share link: ${shareUrl}`);
        break;
      case 'compress':
        alert(`Compressing ${selectedItem!.name} to ${selectedItem!.name}.zip`);
        break;
      case 'properties':
        alert(
          `Properties:\n\n` +
          `Name: ${selectedItem!.name}\n` +
          `Type: ${selectedItem!.type}\n` +
          `Size: ${selectedItem!.size} bytes\n` +
          `Modified: ${selectedItem!.modified.toLocaleString()}\n` +
          `Path: ${selectedItem!.path}`
        );
        break;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (key: string) => {
    const sorted = [...displayedFiles].sort((a, b) => {
      if (key === 'name') {
        return a.name.localeCompare(b.name);
      } else if (key === 'size') {
        return a.size - b.size;
      } else if (key === 'modified') {
        return a.modified.getTime() - b.modified.getTime();
      } else if (key === 'type') {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });
    
    setDisplayedFiles(sorted);
  };

  const handleRefresh = () => {
    setDisplayedFiles([...currentFolder.children]);
  };

  const handleNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      const newFolder: FolderItem = {
        id: crypto.randomUUID(),
        name: folderName,
        type: 'folder',
        size: 0,
        modified: new Date(),
        path: `${currentPath}/${folderName}`,
        isDirectory: true,
        children: [],
      };
      setDisplayedFiles([...displayedFiles, newFolder]);
    }
  };

  const handleNewFile = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const newFile: FileItem = {
        id: crypto.randomUUID(),
        name: fileName,
        type: fileName.split('.').pop() || 'txt',
        size: 0,
        modified: new Date(),
        path: `${currentPath}/${fileName}`,
        isDirectory: false,
      };
      setDisplayedFiles([...displayedFiles, newFile]);
    }
  };

  const handleUpload = () => {
    // In a real app, this would open a file upload dialog
    console.log('Upload files');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b p-3 flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">File Manager</h1>
      </div>
      
      <Breadcrumbs path={currentPath} onNavigate={navigateToFolder} />
      
      <Toolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onRefresh={handleRefresh}
        onNewFolder={handleNewFolder}
        onNewFile={handleNewFile}
        onUpload={handleUpload}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r bg-white overflow-hidden flex-shrink-0 hidden md:block">
          <TreeView
            data={mockFileSystem}
            onItemSelect={handleItemSelect}
            selectedItem={selectedItem}
            onContextMenu={handleContextMenu}
          />
        </div>
        
        <div 
          className="flex-1 overflow-hidden"
          onContextMenu={(e) => {
            e.preventDefault();
            handleContextMenu(e, null);
          }}
        >
          <FilesView
            files={displayedFiles}
            viewMode={viewMode}
            selectedItem={selectedItem}
            onSelectItem={handleItemSelect}
            onOpenItem={handleItemOpen}
            onContextMenu={handleContextMenu}
          />
        </div>
      </div>
      
      <ContextMenu
        visible={contextMenu.visible}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        selectedItem={selectedItem}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
        onAction={handleContextMenuAction}
        hasClipboardItem={clipboard !== null}
      />
    </div>
  );
};

export default FileManagerLayout;