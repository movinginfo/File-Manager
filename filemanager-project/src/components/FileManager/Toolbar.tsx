import React from 'react';
import {
  LayoutGrid,
  List,
  Upload,
  FolderPlus,
  FilePlus,
  RefreshCw,
  Search,
  ChevronDown,
} from 'lucide-react';
import { ViewMode } from '../../types/files';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onRefresh: () => void;
  onNewFolder: () => void;
  onNewFile: () => void;
  onUpload: () => void;
  onSearch: (query: string) => void;
  onSort: (key: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  viewMode,
  onViewModeChange,
  onRefresh,
  onNewFolder,
  onNewFile,
  onUpload,
  onSearch,
  onSort,
}) => {
  return (
    <div className="bg-white border-b flex flex-col sm:flex-row items-center px-4 py-2 gap-2">
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          onClick={onRefresh}
          title="Refresh"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          onClick={onNewFolder}
          title="New Folder"
        >
          <FolderPlus className="h-5 w-5" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          onClick={onNewFile}
          title="New File"
        >
          <FilePlus className="h-5 w-5" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-600"
          onClick={onUpload}
          title="Upload"
        >
          <Upload className="h-5 w-5" />
        </button>
      </div>
      
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search files..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center rounded-md border overflow-hidden">
          <button
            className={`p-2 ${
              viewMode === 'list'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onViewModeChange('list')}
            title="List View"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            className={`p-2 ${
              viewMode === 'grid'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative inline-block text-left">
          <button
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {}}
          >
            Sort By
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
            <div className="py-1">
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                onClick={() => onSort('name')}
              >
                Name
              </button>
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                onClick={() => onSort('size')}
              >
                Size
              </button>
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                onClick={() => onSort('modified')}
              >
                Date Modified
              </button>
              <button
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                onClick={() => onSort('type')}
              >
                Type
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;