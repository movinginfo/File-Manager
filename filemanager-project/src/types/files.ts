export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  modified: Date;
  path: string;
  isDirectory: boolean;
}

export interface FolderItem extends FileItem {
  children: FileItem[];
  isExpanded?: boolean;
}

export type ViewMode = 'list' | 'grid';

export interface ContextMenuItem {
  label: string;
  icon: string;
  action: () => void;
  divider?: boolean;
}